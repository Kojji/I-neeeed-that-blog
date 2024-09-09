import { defineStore } from "pinia";

export const useAmazonCtaSectionStore = defineStore("amazonCtaSection", {
  state: () => ({
    request: "",
    products: [],
    affiliateLink: "",
  }),
  persist: true,
  getters: {
    getProducts(state) {
      return state.products;
    },
  },
  actions: {
    async retrieveProducts(ASINArray) {
      try {
        console.log(ASINArray);
        let productsArray = [];
        // request and
        productsArray = [
          {
            ASIN: "B0199980K4",
            URL: "https://m.media-amazon.com/images/I/71ftrQdl46L._AC_SY741_.jpg",
            DetailPageURL:
              "https://www.amazon.com/dp/B0199980K4?tag=xyz-20&linkCode=ogi&language=en_US&th=1&psc=1",
            DisplayValue:
              "Casio Collection Wristwatch, Standard, Digital/Analog, Combination Series",
            Currency: "USD",
            DisplayAmount: "$11.99",
          },
          {
            ASIN: "B00FHTZ70W",
            URL: "https://m.media-amazon.com/images/I/81-Hird8gNL._AC_SX679_.jpg",
            DetailPageURL:
              "https://www.amazon.com.au/dp/B00FHTZ70W/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B00FHTZ70W&pd_rd_w=0xCeU&content-id=amzn1.sym.1466049c-a1d9-4b3d-b57f-ad4194b25db8&pf_rd_p=1466049c-a1d9-4b3d-b57f-ad4194b25db8&pf_rd_r=MA66MZ82A79SBF6P1MBZ&pd_rd_wg=3BSn0&pd_rd_r=35ec7184-e8a4-4750-a381-61dc4492f67a&s=fashion&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw",
            DisplayValue: "Hugo Boss Velocity Silicone Dial Men's Watch",
            Currency: "USD",
            DisplayAmount: "$110.99",
          },
        ];
        this.products = productsArray;
        console.log(productsArray);
      } catch (error) {
        console.log(error);
      }
      /*
      {
        "Errors": [
          {
            "__type": "com.amazon.paapi#ErrorData",
            "Code": "ItemNotAccessible",
            "Message": "The ItemId B01180YUXS is not accessible through the Product Advertising API."
          }
        ],
        "ItemResults": {
          "Items": [
            {
              "ASIN": "B0199980K4",
              "DetailPageURL": "https://www.amazon.com/dp/B0199980K4?tag=xyz-20&linkCode=ogi&language=en_US&th=1&psc=1",
              "Images": {
                "Primary": {
                  "Small": {
                    "Height": 75,
                    "URL": "https://m.media-amazon.com/images/I/61s4tTAizUL._SL75_.jpg",
                    "Width": 56
                  }
                }
              },
              "ItemInfo": {
                "Title": {
                  "DisplayValue": "Genghis: The Legend of the Ten",
                  "Label": "Title",
                  "Locale": "en_US"
                }
              },
              "Offers": {
                "Summaries": [
                  {
                    "Condition": {
                      "DisplayValue": "nuevo",
                      "Label": "Condición",
                      "Locale": "es_US",
                      "Value": "New"
                    },
                    "HighestPrice": {
                      "Amount": 11.99,
                      "Currency": "USD",
                      "DisplayAmount": "$11.99"
                    }
                  }
                ]
              },
              "ParentASIN": "B07QGKM68X"
            },
            {
              "ASIN": "B00BKQTA4A",
              "DetailPageURL": "https://www.amazon.com/dp/B00BKQTA4A?tag=xyz-20&linkCode=ogi&language=en_US&th=1&psc=1",
              "Images": {
                "Primary": {
                  "Small": {
                    "Height": 75,
                    "URL": "https://m.media-amazon.com/images/I/41OiLOcQVJL._SL75_.jpg",
                    "Width": 46
                  }
                }
              },
              "ItemInfo": {
                "Features": {
                  "DisplayValues": [
                    "Round watch featuring logoed white dial with stick indices",
                    "36 mm stainless steel case with mineral dial window",
                    "Quartz movement with analog display",
                    "Leather calfskin band with buckle closure",
                    "Water resistant to 30 m (99 ft): In general, withstands splashes or brief immersion in water, but not suitable for swimming"
                  ],
                  "Label": "Features",
                  "Locale": "en_US"
                },
                "Title": {
                  "DisplayValue": "Daniel Wellington Women's 0608DW Sheffield Stainless Steel Watch",
                  "Label": "Title",
                  "Locale": "en_US"
                }
              },
              "Offers": {
                "Summaries": [
                  {
                    "Condition": {
                      "DisplayValue": "nuevo",
                      "Label": "Condición",
                      "Locale": "es_US",
                      "Value": "New"
                    },
                    "HighestPrice": {
                      "Amount": 199,
                      "Currency": "USD",
                      "DisplayAmount": "$199.00"
                    }
                  }
                ]
              },
              "ParentASIN": "B07L5N7P32"
            },
            {
              "ASIN": "B000HZD168",
              "DetailPageURL": "https://www.amazon.com/dp/B000HZD168?tag=xyz-20&linkCode=ogi&language=en_US&th=1&psc=1",
              "Images": {
                "Primary": {
                  "Small": {
                    "Height": 75,
                    "URL": "https://m.media-amazon.com/images/I/61ZRPpZoBvL._SL75_.jpg",
                    "Width": 56
                  }
                }
              },
              "ItemInfo": {
                "Title": {
                  "DisplayValue": "Star Trek II: The Wrath of Khan",
                  "Label": "Title",
                  "Locale": "en_US"
                }
              },
              "Offers": {
                "Summaries": [
                  {
                    "Condition": {
                      "DisplayValue": "nuevo",
                      "Label": "Condición",
                      "Locale": "es_US",
                      "Value": "New"
                    },
                    "HighestPrice": {
                      "Amount": 9.99,
                      "Currency": "USD",
                      "DisplayAmount": "$9.99"
                    }
                  }
                ]
              },
              "ParentASIN": "B07G9PHJJH"
            }
          ]
        }
      }*/
    },
  },
});
