import assert from "assert";
import { Business } from "../include/data.js";
import { FluentBusinesses } from "./FluentBusinesses";

const testData: Business[] = [
  {
    business_id: "abcd",
    name: "Applebee's",
    city: "Charlotte",
    state: "NC",
    stars: 4,
    review_count: 6,
  },
  {
    business_id: "abcd",
    name: "China Garden",
    state: "NC",
    city: "Charlotte",
    stars: 4,
    review_count: 10,
  },
  {
    business_id: "abcd",
    name: "Beach Ventures Roofing",
    state: "AZ",
    city: "Phoenix",
    stars: 3,
    review_count: 30,
  },
  {
    business_id: "abcd",
    name: "Alpaul Automobile Wash",
    city: "Charlotte",
    state: "NC",
    stars: 3,
    review_count: 30,
  },
];

describe("bestPlace", () => {
  it("filters correctly", () => {
    const list = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").getData();

    assert(list.length === 3);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "China Garden");
    assert(list[2].name === "Alpaul Automobile Wash");
  });

  it("break tie with review count", () => {
    const best = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").bestPlace();

    assert(best);
    assert(best.name === "China Garden");
  });

  it("if there are no businesses it returns undefined", () => {
    const best = new FluentBusinesses([]).bestPlace();

    expect(best).toBeUndefined();
  });
});

describe("hasStarsGeq", () => {
  it("correctly filters data", () => {
    const list = new FluentBusinesses(testData).hasStarsGeq(4).getData();

    assert(list.length === 2);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "China Garden");
  });

  it("if there is none it returns an empty list", () => {
    const list = new FluentBusinesses(testData).hasStarsGeq(5).getData();

    assert(list.length === 0);
  });
});

describe("inCategory", () => {
  it("if there is none it returns an empty list", () => {
    const list = new FluentBusinesses(testData).inCategory("Nonexistent Category").getData();

    assert(list.length === 0);
  });
});

describe("hasHoursOnDays", () => {
  it("if there is none it returns an empty list", () => {
    const list = new FluentBusinesses(testData).hasHoursOnDays(["Nonexistent Day"]).getData();

    assert(list.length === 0);
  });
});

describe("hasAmbience", () => {
  it("correctly filters data", () => {
    const list = new FluentBusinesses(testData).hasAmbience("romantic").getData();

    assert(list.length === 0);
  });

  it("if there is none it returns an empty list", () => {
    const list = new FluentBusinesses(testData).hasAmbience("Nonexistent Ambience").getData();

    assert(list.length === 0);
  });
});

describe("mostReviews", () => {
  it("if there are no businesses it returns undefined", () => {
    const mostReviewed = new FluentBusinesses([]).mostReviews();

    assert(mostReviewed === undefined);
  });
});

describe("fromCityInState", () => {
  it("correctly filters data", () => {
    const list = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").getData();

    assert(list.length === 3);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "China Garden");
    assert(list[2].name === "Alpaul Automobile Wash");
  });

  it("if there are no businesses are found in the given city and state it returns an empty list", () => {
    const list = new FluentBusinesses(testData).fromCityInState("Raleigh", "NC").getData();

    assert(list.length === 0);
  });
});
