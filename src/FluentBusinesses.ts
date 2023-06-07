import type { Business } from "../include/data.js";

type FilterForBusiness = (b: Business) => boolean;

export class FluentBusinesses {
  private data: Business[];

  constructor(data: Business[]) {
    this.data = data;
  }

  private dataFilter(f: FilterForBusiness): FluentBusinesses {
    const dataFiltered = this.data.filter(f);
    return new FluentBusinesses(dataFiltered);
  }

  getData(): Business[] {
    return this.data;
  }

  fromCityInState(city: string, state: string): FluentBusinesses {
    const f: FilterForBusiness = b => b.city === city && b.state === state;
    return this.dataFilter(f);
  }

  hasStarsGeq(stars: number): FluentBusinesses {
    const f: FilterForBusiness = b => b.stars !== undefined && b.stars >= stars;
    return this.dataFilter(f);
  }

  inCategory(category: string): FluentBusinesses {
    const f: FilterForBusiness = b => b.categories !== undefined && b.categories.includes(category);
    return this.dataFilter(f);
  }

  hasHoursOnDays(days: string[]): FluentBusinesses {
    const f: FilterForBusiness = b => days.every(day => b.hours && b.hours[day] && b.hours[day].length > 0);
    return this.dataFilter(f);
  }

  hasAmbience(ambience: string): FluentBusinesses {
    const f: FilterForBusiness = b => b.attributes !== undefined && b.attributes.Ambience?.[ambience] === true;
    return this.dataFilter(f);
  }

  bestPlace(): Business | undefined {
    const dataSort = this.data.sort((b1, b2) => {
      if (
        b1.stars !== undefined &&
        b2.stars !== undefined &&
        b1.review_count !== undefined &&
        b2.review_count !== undefined
      ) {
        if (b1.stars === b2.stars) {
          if (b1.review_count === b2.review_count) {
            return 0;
          }
          return b1.review_count > b2.review_count ? -1 : 1;
        }
        return b1.stars > b2.stars ? -1 : 1;
      }
      return 0;
    });
    return dataSort[0] || undefined;
  }

  mostReviews(): Business | undefined {
    const dataSort = this.data.sort((b1, b2) => {
      if (
        b1.stars !== undefined &&
        b2.stars !== undefined &&
        b1.review_count !== undefined &&
        b2.review_count !== undefined
      ) {
        if (b1.review_count === b2.review_count) {
          return b1.stars > b2.stars ? -1 : 1;
        }
        return b1.review_count > b2.review_count ? -1 : 1;
      }
      return 0;
    });
    return dataSort[0] || undefined;
  }
}
