import axios from 'axios';
import * as cheerio from 'cheerio';
import { MoviePricing, PricingPlatform, PricingType } from '@domain/models';

export async function getPrice(megogoId: string): Promise<MoviePricing[]> {
  const prices = [];

  const megogoPricing = await getMegogoPrice(megogoId);
  console.log(megogoPricing);

  if (megogoPricing) {
    prices.push(megogoPricing);
  }

  return prices;
}

export async function getMegogoPrice(megogoLink?: string) {
  if (megogoLink) {
    const page = await getPage(megogoLink);

    if (!page) return [];

    const $ = cheerio.load(page);

    const priceType = $('meta[property="ya:ovs:price"]').attr('content');

    console.log(priceType);

    if (priceType === 'purchase') {
      const purchasePrice = $(
        $('.videoInfoPanel-action .btn-description')[0],
      ).text();

      return {
        platform: PricingPlatform.MEGOGO,
        type: PricingType.PURCHASE,
        price: purchasePrice,
      };
    }

    if (priceType === 'subscription') {
      const subscriptionType = deleteSymbols(
        $($('.stub-description')[0]).text(),
      ).match(/«([^']+)»/)[1];
      const price = deleteSymbols(
        $($('.videoInfoPanel-action .btn-description')[0]).text(),
      );

      return {
        platform: PricingPlatform.MEGOGO,
        type: PricingType.SUBSCRIPTION,
        subscriptionType,
        price: price,
      };
    }
  }

  if (megogoLink) {
    return {
      platform: PricingPlatform.MEGOGO,
      type: PricingType.FREE,
    };
  }

  return null;
}

export async function getMegogoLink(title: string, releaseDate?: string) {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const queryTitle =
    `https://megogo.net/en/search-extended?q=` + title.replace(' ', '+');
  const page = await getPage(queryTitle);
  const $ = cheerio.load(page);

  const videosCards = $('section[data-feed-title=Videos] .card.videoItem');

  if (videosCards.length) {
    for (let i = 0; i < videosCards.length; i++) {
      const card = $(videosCards[i]).find('.card-content');
      const titleEl = card.find('a');
      const titleCard = deleteSymbols(titleEl.text());

      const year = deleteSymbols(card.find('.video-year').text());

      if (
        titleCard === title &&
        ((releaseYear && `${releaseYear}` === year) || !releaseYear)
      ) {
        return titleEl.attr('href');
      }
      // console.log(deleteSymbols(title.text()));
    }
  }

  return null;
}

function getMegogoPage(megogoId: string) {
  return axios
    .get(`https://megogo.net/en/view/${megogoId}`)
    .then(
      (res) =>
        //console.log("[Success] Get megogo page", res)

        res.data,
    )
    .catch((err) => {
      console.log('[Error] Get megogo page', err);

      return null;
    });
}

function getPage(url: string) {
  return axios
    .get(url)
    .then(
      (res) =>
        //console.log("[Success] Get megogo page", res)

        res.data,
    )
    .catch((err) => {
      console.log('[Error] Get page', err);

      return null;
    });
}

function deleteSymbols(str: string) {
  return str.trim().replace(/  {2}|\r\n|\n|\r/gm, '');
}
