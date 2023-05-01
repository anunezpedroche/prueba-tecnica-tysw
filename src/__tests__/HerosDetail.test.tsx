import "reflect-metadata"

import { Character } from "../types/dtos/character/character"
import { render, screen } from "@testing-library/react"

import { TestHeros } from "./TestHeros"

const heroWithDesc: Character = {
  id: 1011337,
  name: "3-D Man",
  description: "Test description",
  modified: new Date("2014-04-29T14:18:17-0400"),
  thumbnail: {
    path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
    extension: "jpg"
  },
  resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
  comics: {
    available: 12,
    collectionURI:
      "http://gateway.marvel.com/v1/public/characters/1011334/comics",
    items: [],
    returned: 12
  }
}
const heroWithoutDesc: Character = {
  id: 1011338,
  name: "3-D Man",
  description: "",
  modified: new Date("2014-04-29T14:18:17-0400"),
  thumbnail: {
    path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
    extension: "jpg"
  },
  resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
  comics: {
    available: 12,
    collectionURI:
      "http://gateway.marvel.com/v1/public/characters/1011334/comics",
    items: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/21366",
        name: "Avengers: The Initiative (2007) #14"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/24571",
        name: "Avengers: The Initiative (2007) #14 (SPOTLIGHT VARIANT)"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/21546",
        name: "Avengers: The Initiative (2007) #15"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/21741",
        name: "Avengers: The Initiative (2007) #16"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/21975",
        name: "Avengers: The Initiative (2007) #17"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/22299",
        name: "Avengers: The Initiative (2007) #18"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/22300",
        name: "Avengers: The Initiative (2007) #18 (ZOMBIE VARIANT)"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/22506",
        name: "Avengers: The Initiative (2007) #19"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/8500",
        name: "Deadpool (1997) #44"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/10223",
        name: "Marvel Premiere (1972) #35"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/10224",
        name: "Marvel Premiere (1972) #36"
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/10225",
        name: "Marvel Premiere (1972) #37"
      }
    ],
    returned: 12
  }
}

const heroes: Character[] = [heroWithDesc, heroWithoutDesc]

describe("HeroesDetail with hero without description and list of comics", () => {
  beforeEach(() => {
    render(<TestHeros hero={heroWithoutDesc} heroes={heroes} />)
  })
  test("should contain no description", () => {
    expect(screen.getByText(/Sin descripción conocida/i)).toBeDefined()
  })
  test("should contain at least one comic Marvel Premiere", () => {
    expect(screen.queryAllByText(/Marvel premiere/i)).toBeDefined()
  })
  test("Should no contain comic x-men", () => {
    expect(screen.queryByText(/x-men/i)).toBeNull()
  })
})

describe("HeroesDetail with hero with description and no list of comics", () => {
  beforeEach(() => {
    render(<TestHeros hero={heroWithDesc} heroes={heroes} />)
  })
  test("should contain description", () => {
    expect(screen.getByText(/test description/i)).toBeDefined()
  })

  test("should not contain no description", () => {
    expect(screen.queryByText(/sin descripción conocida/i)).toBeNull()
  })
  test("should contain no comic message", () => {
    expect(screen.getByText(/sin cómics disponibles/i)).toBeDefined()
  })
  test("Should no contain comic x-men", () => {
    expect(screen.queryByText(/x-men/i)).toBeNull()
  })
})
