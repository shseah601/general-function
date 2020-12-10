const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

export function updateWorkspace(version, apiKey, serviceUrl, workspaceId) {

const assistant = new AssistantV1({
  version: version,
  authenticator: new IamAuthenticator({
    apikey: apiKey
  }),
  serviceUrl: serviceUrl,
});

const params = {
  workspaceId: workspaceId,
  append: true,
  intents: [
    {
      "intent": "Changi_Festive_Village_EAT_Button",
      "examples": [
        {
          "text": "Changi_Festive_Village_EAT_Button"
        }
      ],
      "description": "EAT_Button"
    },
    {
      "intent": "Changi_Festive_Village_EAT_Changi_Eats",
      "examples": [
        {
          "text": "changi eats"
        },
        {
          "text": "Changi_Festive_Village_EAT_Changi_Eats"
        },
        {
          "text": "EAT_changi_eats"
        },
        {
          "text": "festive changi eats"
        },
        {
          "text": "how much do I spend for free shipping with changi eats"
        },
        {
          "text": "mix and match order from 5 different outlets"
        },
        {
          "text": "what is changi eats"
        },
        {
          "text": "when is changi eats"
        },
        {
          "text": "where can I get changi eats"
        }
      ],
      "description": "EAT_Changi_Eats"
    },
    {
      "intent": "Changi_Festive_Village_EAT_Changi_Great_Deals",
      "examples": [
        {
          "text": "2 hour free weekday parking promotion"
        },
        {
          "text": "Changi_Festive_Village_EAT_Changi_Great_Deals"
        },
        {
          "text": "changi_great_deals"
        },
        {
          "text": "changi wings"
        },
        {
          "text": "what are some of the good deals at changi?"
        },
        {
          "text": "what are some of the graet deals at changi airport"
        }
      ],
      "description": "EAT_Changi_Great_Deals"
    },
    {
      "intent": "Changi_Festive_Village_EAT_Dine_Changi_Jewel",
      "examples": [
        {
          "text": "Changi_Festive_Village_EAT_Dine_Changi_Jewel"
        },
        {
          "text": "dine_changi_jewel"
        },
        {
          "text": "what is good at jewel and changi for eat"
        },
        {
          "text": "what is the best food options for dine at jewel and at changi"
        },
        {
          "text": "what to eat at changi"
        },
        {
          "text": "where can I eat at jewel and at changi"
        }
      ],
      "description": "EAT_Dine_Changi_Jewel"
    },
    {
      "intent": "Changi_Festive_Village_EAT_Dino_Fest",
      "examples": [
        {
          "text": "dino fest"
        },
        {
          "text": "dino_fest"
        },
        {
          "text": "dinosaurs inspired food and drinks"
        },
        {
          "text": "dino-themed festive market"
        },
        {
          "text": "how much is dino fest"
        },
        {
          "text": "location of dino fest"
        },
        {
          "text": "what is dino fest"
        },
        {
          "text": "where can i find dino fest"
        },
        {
          "text": "where is dino fest"
        },
        {
          "text": "who can enter dino fest"
        }
      ],
      "description": "EAT_Dino_fest"
    },
    {
      "intent": "Changi_Festive_Village_Main",
      "examples": [
        {
          "text": "changi festive events"
        },
        {
          "text": "changi festive market"
        },
        {
          "text": "changi festive village"
        },
        {
          "text": "changi festive village events"
        },
        {
          "text": "craft work shops"
        },
        {
          "text": "dinosaur event"
        },
        {
          "text": "education camps"
        },
        {
          "text": "festive events"
        },
        {
          "text": "festive fun"
        },
        {
          "text": "festive fun at changi airport"
        },
        {
          "text": "tokidoki-themed activities"
        }
      ],
      "description": "Festive_Village_Main"
    },
    {
      "intent": "Changi_Festive_Village_PLAY_Activities_Workshop",
      "examples": [
        {
          "text": "activities_workshop"
        },
        {
          "text": "airport emergency service"
        },
        {
          "text": "airport emergency service experience"
        },
        {
          "text": "aquascaping workshop"
        },
        {
          "text": "changi drones workshop"
        },
        {
          "text": "changi drone workshop"
        },
        {
          "text": "changi experience studio"
        },
        {
          "text": "changi game of drones"
        },
        {
          "text": "drone force"
        },
        {
          "text": "festive craft workshop"
        },
        {
          "text": "festive floral ornament"
        },
        {
          "text": "fly mini drone"
        },
        {
          "text": "how to join changi drone workshop"
        },
        {
          "text": "how to join the succulent terrarium workshop ?"
        },
        {
          "text": "I want to learn about airport emergency experience"
        },
        {
          "text": "I want to learn aquascaping"
        },
        {
          "text": "I want to make aquarium"
        },
        {
          "text": "I want to make craft a garden underwater"
        },
        {
          "text": "learn about fire fighters at the airport"
        },
        {
          "text": "mini drone challenges"
        },
        {
          "text": "succulent terrarium workshop"
        },
        {
          "text": "terrarium workshop"
        },
        {
          "text": "where is the activity and workshop"
        },
        {
          "text": "where is the festive craft workshop"
        },
        {
          "text": "where to go for the terrarium workshop"
        }
      ],
      "description": "PLAY_Activities_Workshop"
    },
    {
      "intent": "Changi_Festive_Village_PLAY_Button",
      "examples": [
        {
          "text": "Changi_Festive_Village_PLAY_Button"
        }
      ],
      "description": "PLAY_Button"
    },
    {
      "intent": "Changi_Festive_Village_PLAY_Dino_Bounce",
      "examples": [
        {
          "text": "dino_bounce"
        },
        {
          "text": "dino bounce land and dino bounce sea"
        },
        {
          "text": "dino bounce sea"
        },
        {
          "text": "dino-themed bouncy castle"
        },
        {
          "text": "how to get in to dino bounce"
        },
        {
          "text": "how to get into dino bounce"
        },
        {
          "text": "how to redeem passes for dino bounce activities"
        },
        {
          "text": "tickets for dino bounce"
        },
        {
          "text": "what is dino bounce"
        },
        {
          "text": "when is dino bounce until?"
        },
        {
          "text": "where is the dino bounce"
        },
        {
          "text": "where is the dino bouncy castle"
        }
      ],
      "description": "PLAY_Dino_Bounce"
    },
    {
      "intent": "Changi_Festive_Village_PLAY_Dino_Kart",
      "examples": [
        {
          "text": "dino_kart"
        },
        {
          "text": "dino kart at the airport"
        },
        {
          "text": "go-kart"
        },
        {
          "text": "go kart race"
        },
        {
          "text": "how to redeem pass for the go-kart"
        },
        {
          "text": "I want to go kart at the airport"
        },
        {
          "text": "what is dino kart"
        },
        {
          "text": "when is dino kart until?"
        },
        {
          "text": "where is the go - kart"
        },
        {
          "text": "where to get pass for go-kart"
        },
        {
          "text": "who can play dino go kart?"
        }
      ],
      "description": "PLAY_Dino_Kart"
    },
    {
      "intent": "Changi_Festive_Village_PLAY_tokidoki_Snow_Holiday",
      "examples": [
        {
          "text": "how much is the pass for tokidoki snow holiday"
        },
        {
          "text": "how to get in to tokidoki snow holiday"
        },
        {
          "text": "how to get tickets for tokidoki snow holiday?"
        },
        {
          "text": "how to redeem pass for tokidoki snow holiday"
        },
        {
          "text": "I want to play at the snow house"
        },
        {
          "text": "I want to play snow at the airport"
        },
        {
          "text": "snow at the airport"
        },
        {
          "text": "snow holiday at the airport"
        },
        {
          "text": "snow man snow luge"
        },
        {
          "text": "snow slide at the airport with tokidoki"
        },
        {
          "text": "tokidoki snow at the airport"
        },
        {
          "text": "tokidoki_snow_holiday"
        },
        {
          "text": "what is tokidoki snow holiday?"
        },
        {
          "text": "when is tokidoki snow holiday until?"
        },
        {
          "text": "where is tokidoki snow holiday"
        },
        {
          "text": "who can enter tokidoki snow holiday?"
        },
        {
          "text": "winter at the airport"
        }
      ],
      "description": "PLAY_tokidoki_Snow_Holiday"
    },
    {
      "intent": "Changi_Festive_Village_SEE_Air_tokidoki",
      "examples": [
        {
          "text": "air plane cabin tokidoki"
        },
        {
          "text": "air tokidoki"
        },
        {
          "text": "air_tokidoki"
        },
        {
          "text": "air tokidoki themed plane cabin"
        },
        {
          "text": "I want to visit the tokidoki themed plane cabin"
        },
        {
          "text": "location of tokidoki plane cabin"
        },
        {
          "text": "tokidoki plan cabin"
        },
        {
          "text": "tokidoki plane cabin"
        },
        {
          "text": "tokidoki themed plane cabin"
        },
        {
          "text": "where is tokidoki plane cabin"
        }
      ],
      "description": "SEE_Air_tokidoki"
    },
    {
      "intent": "Changi_Festive_Village_SEE_Button",
      "examples": [
        {
          "text": "Changi_Festive_Village_SEE_Button"
        }
      ],
      "description": "SEE_Button"
    },
    {
      "intent": "Changi_Festive_Village_SEE_Dino_Wanderland",
      "examples": [
        {
          "text": "dino wanderland"
        },
        {
          "text": "dino wander land"
        },
        {
          "text": "dino_wanderland"
        },
        {
          "text": "dino wanderland event"
        },
        {
          "text": "how to get into dino wanderland"
        },
        {
          "text": "how to redeem passes for dino wanderland"
        },
        {
          "text": "I want to see life-like dinosaurs"
        },
        {
          "text": "I want to take photos with dinosaurs"
        },
        {
          "text": "photo taking with life like dinosaurs"
        },
        {
          "text": "tickets for dino wanderland"
        },
        {
          "text": "where is dino wanderland"
        },
        {
          "text": "where is the dino wanderland"
        }
      ],
      "description": "SEE_Dino_Wanderland"
    },
    {
      "intent": "Changi_Festive_Village_SEE_Jurassic_Mile",
      "examples": [
        {
          "text": "carnivorous and herbivorous species dinosaurs"
        },
        {
          "text": "changi jurassic mile"
        },
        {
          "text": "how to get to jurassic mile"
        },
        {
          "text": "I want to see dino dazzle"
        },
        {
          "text": "jurassic mile"
        },
        {
          "text": "jurassic mile cycling and jogging path"
        },
        {
          "text": "opening hours of jurassic mile"
        },
        {
          "text": "see_Jurassic_mile"
        },
        {
          "text": "tyrannosaurus rex"
        },
        {
          "text": "where is jurassic mile"
        },
        {
          "text": "where is jurassic mile located"
        }
      ],
      "description": "SEE_Jurassic_Mile"
    },
    {
      "intent": "Changi_Festive_Village_SEE_Sparkling_Christmas_Jewel",
      "examples": [
        {
          "text": "16 m tall christmas tree"
        },
        {
          "text": "hourly giveaways gingerbread man reindeer lapel pins"
        },
        {
          "text": "I want to see the christmas tree at jewel"
        },
        {
          "text": "sparkling christmas at jewel"
        },
        {
          "text": "sparkling_christmas_jewel"
        },
        {
          "text": "where is the sparkling christmas at jewel"
        },
        {
          "text": "where is the sparkling christmas tree at jewel?"
        }
      ],
      "description": "SEE_Sparkling_Christmas_Jewel"
    },
    {
      "intent": "Changi_Festive_Village_SHOP_Button",
      "examples": [
        {
          "text": "Changi_Festive_Village_SHOP_Button"
        }
      ],
      "description": "SHOP_Button"
    },
    {
      "intent": "Changi_Festive_Village_Shop_Happy_Haulidays_ISC",
      "examples": [
        {
          "text": "happy_haulidays_isc"
        },
        {
          "text": "sitewide promotions for Happy Haul-idays"
        },
        {
          "text": "what are the special promotions for Happy Haul-idays"
        },
        {
          "text": "what is Happy Haul-idays"
        },
        {
          "text": "what is Happy Haul-idays christmas sale"
        },
        {
          "text": "when is Happy Haul-idays sales"
        },
        {
          "text": "when is the promotion for Happy Haul-idays"
        }
      ],
      "description": "Shop_Happy_Haulidays_ISC"
    },
    {
      "intent": "Changi_Festive_Village_Shop_Jurassic_Mile_Premiums",
      "examples": [
        {
          "text": "Changi_Festive_Village_Shop_Jurassic_Mile_Premiums"
        },
        {
          "text": "how much are jurassic mile premiums"
        },
        {
          "text": "jurassic mile premiums dino sets"
        },
        {
          "text": "jurassic mile premiums tote bag"
        },
        {
          "text": "jurassic mile premiums t-shirt"
        },
        {
          "text": "shop_jurassic_mile_premiums"
        },
        {
          "text": "where can I buy jurassic mile premiums"
        },
        {
          "text": "where can I shop for jurassic mile premiums"
        }
      ],
      "description": "Shop_Jurassic_Mile_Premiums"
    },
    {
      "intent": "Changi_Festive_Village_Shop_Sure_Win_CR",
      "examples": [
        {
          "text": "how to participate in sure win changi rewards"
        },
        {
          "text": "how to play the sure win token scavenger hunt?"
        },
        {
          "text": "shop_sure_win_cr"
        },
        {
          "text": "what is sure win changi rewards?"
        },
        {
          "text": "what is sure win changi rewards mega prize"
        },
        {
          "text": "when is sure win changi rewards"
        },
        {
          "text": "where is the sure win scavenger hunt?"
        }
      ],
      "description": "Shop_Sure_Win_CR"
    },
    {
      "intent": "Changi_Festive_Village_Shop_tokidoki_Premiums",
      "examples": [
        {
          "text": "how much is tokidoki kaijiu premiums"
        },
        {
          "text": "how to get tokidoki kaijiu premiums"
        },
        {
          "text": "tokidoki kaijiu premiums"
        },
        {
          "text": "tokidoki premiums"
        },
        {
          "text": "tokidoki_premiums"
        },
        {
          "text": "what is the criteria to get tokidoki kaijiu premiums"
        },
        {
          "text": "what is the min nett spend for tokidoki kaijiu premiums"
        },
        {
          "text": "when will tokidoki kaijiu premiums be available"
        },
        {
          "text": "where can I get tokidoki kaijiu premiums"
        },
        {
          "text": "where to collect tokidoki kaijiu premiums"
        }
      ],
      "description": "Shop_tokidoki_Premiums"
    },
    {
      "intent": "Changi_Festive_Village_STAY_Button",
      "examples": [
        {
          "text": "Changi_Festive_Village_STAY_Button"
        }
      ],
      "description": "STAY_Button"
    },
    {
      "intent": "Changi_Festive_Village_STAY_Glampcation_Clouds",
      "examples": [
        {
          "text": "glampcation_in_the_clouds"
        },
        {
          "text": "how long is each session for glampcation in the clouds"
        },
        {
          "text": "how much is glampcation in the clouds"
        },
        {
          "text": "how to get tickets for glampcation in the clouds"
        },
        {
          "text": "what are the check in and out timings for glampcation in the clouds"
        },
        {
          "text": "what does glampcation in the clouds package include"
        },
        {
          "text": "what is glampcation in the clouds"
        },
        {
          "text": "what is the pricing for glampcation in the clouds"
        },
        {
          "text": "when is glampcation in the clouds"
        },
        {
          "text": "where is glampcation in the clouds"
        }
      ],
      "description": "STAY_Glampcation_Clouds"
    },
    {
      "intent": "Changi_Festive_Village_STAY_Glampcation_Forest_Valley",
      "examples": [
        {
          "text": "glampcation at jewel forest valley"
        },
        {
          "text": "glampcation_forest_valley"
        },
        {
          "text": "how much is glampcation at jewel"
        },
        {
          "text": "how much is glampcation at jewel forest valley"
        },
        {
          "text": "shower facilities for glamp tent shideido forest valley"
        },
        {
          "text": "what are the check in and out timings for shideido forest valley glampcation"
        },
        {
          "text": "what are the occupancy for each glamp tent at shideido forest valley"
        },
        {
          "text": "what are the pricing for shideido forest valley glampcation"
        },
        {
          "text": "when is the glampcation at shideido forest valley"
        },
        {
          "text": "where is glampcation at shideido forest valley"
        }
      ],
      "description": "STAY_Glampcation_Forest_Valley"
    },
    {
      "intent": "Changi_Festive_Village_STAY_Glampicnics",
      "examples": [
        {
          "text": "glampicnics"
        },
        {
          "text": "glampicnics in the clouds"
        },
        {
          "text": "glampicnics in the clouds for up to 5 pax"
        },
        {
          "text": "how big is the glampicnics tent?"
        },
        {
          "text": "how many hours per slot for glampicnics in the clouds"
        },
        {
          "text": "how much is glampicnics in the clouds"
        },
        {
          "text": "how to get in to glampicnics in the clouds"
        },
        {
          "text": "what is glampicnics in the clouds"
        },
        {
          "text": "what is included for glampicnics in the clouds"
        },
        {
          "text": "when is the session for glampicnics in the clouds"
        },
        {
          "text": "where is glampicnics in the clouds"
        }
      ],
      "description": "STAY_Glampicnics"
    },
    {
      "intent": "Changi_Festive_Village_STAY_Night_at_Airport",
      "examples": [
        {
          "text": "how many people can be in a tent for night at the airport"
        },
        {
          "text": "how much does it cost for night at the airport"
        },
        {
          "text": "how to get tickets for night at the airport"
        },
        {
          "text": "night_at_airport"
        },
        {
          "text": "sleepover programme"
        },
        {
          "text": "what is included in the night at the airport"
        },
        {
          "text": "what is night at the airport"
        },
        {
          "text": "when is the night at the airport"
        },
        {
          "text": "where is the night at the airport"
        },
        {
          "text": "where to book for night at the airport"
        }
      ],
      "description": "STAY_Night_at_Airport"
    }
  ]
};

assistant.updateWorkspace(params)
  .then(res => {
    console.log('update workspace', JSON.stringify(res.result, null, 2));
  })
  .catch(err => {
    console.log('update workspace error', err)
  });
}
