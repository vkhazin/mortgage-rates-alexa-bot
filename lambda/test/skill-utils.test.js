"use strict";

const timeOut       = 5000;
const skillUtils    = require('../skill-utils');
const assert        = require('assert');

const payload = {
  "mortgages": [
    {
      "provider": "Peoples Trust",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 2.5,
          "comment": "Prime - 1.20"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.39
        },
        {
          "type": "5-years-fixed",
          "rate": 3.19
        },
        {
          "type": "10-years-fixed",
          "rate": 0
        }
      ]
    },
    {
      "provider": "Equitable Bank",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 2.7,
          "comment": "Prime - 1.00"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.79
        },
        {
          "type": "5-years-fixed",
          "rate": 3.49
        },
        {
          "type": "10-years-fixed",
          "rate": 0
        }
      ]
    },
    {
      "provider": "Duca",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 2.7,
          "comment": "Prime - 1.00"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.74
        },
        {
          "type": "5-years-fixed",
          "rate": 3.34
        },
        {
          "type": "10-years-fixed",
          "rate": 0
        }
      ]
    },
    {
      "provider": "HSBC",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 2.79,
          "comment": "Prime - 0.91"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.49
        },
        {
          "type": "5-years-fixed",
          "rate": 3.44
        },
        {
          "type": "10-years-fixed",
          "rate": 6.24
        }
      ]
    },
    {
      "provider": "Meridian Credit Union",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 2.9,
          "comment": "Prime - 0.80"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.54
        },
        {
          "type": "5-years-fixed",
          "rate": 3.19
        },
        {
          "type": "10-years-fixed",
          "rate": 6.05
        }
      ]
    },
    {
      "provider": "TD Bank",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3,
          "comment": "Prime - 0.70"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.59
        },
        {
          "type": "5-years-fixed",
          "rate": 3.49
        },
        {
          "type": "10-years-fixed",
          "rate": 4.54
        }
      ]
    },
    {
      "provider": "Desjardins",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.05,
          "comment": "Prime - 0.65"
        },
        {
          "type": "3-years-fixed",
          "rate": 4.3
        },
        {
          "type": "5-years-fixed",
          "rate": 3.84
        },
        {
          "type": "10-years-fixed",
          "rate": 6.6
        }
      ]
    },
    {
      "provider": "RBC Royal Bank",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.05,
          "comment": "Prime - 0.65"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.49
        },
        {
          "type": "5-years-fixed",
          "rate": 3.74
        },
        {
          "type": "10-years-fixed",
          "rate": 6.6
        }
      ]
    },
    {
      "provider": "First National",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.05,
          "comment": "Prime - 0.65"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.64
        },
        {
          "type": "5-years-fixed",
          "rate": 3.59
        },
        {
          "type": "10-years-fixed",
          "rate": 4.24
        }
      ]
    },
    {
      "provider": "Tangerine",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.2,
          "comment": "Prime - 0.50"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.39
        },
        {
          "type": "5-years-fixed",
          "rate": 3.59
        },
        {
          "type": "10-years-fixed",
          "rate": 3.89
        }
      ]
    },
    {
      "provider": "National Bank",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.7,
          "comment": "Prime - 0.00"
        },
        {
          "type": "3-years-fixed",
          "rate": 0
        },
        {
          "type": "5-years-fixed",
          "rate": 3.74
        },
        {
          "type": "10-years-fixed",
          "rate": 0
        }
      ]
    },
    {
      "provider": "CIBC",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.7,
          "comment": "Prime - 0.00"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.74
        },
        {
          "type": "5-years-fixed",
          "rate": 3.29
        },
        {
          "type": "10-years-fixed",
          "rate": 6.44
        }
      ]
    },
    {
      "provider": "Simplii Financial",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.7,
          "comment": "Prime - 0.00"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.69
        },
        {
          "type": "5-years-fixed",
          "rate": 3.59
        },
        {
          "type": "10-years-fixed",
          "rate": 6.05
        }
      ]
    },
    {
      "provider": "Bank of Montreal",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.85,
          "comment": "Prime + 0.15"
        },
        {
          "type": "3-years-fixed",
          "rate": 4.15
        },
        {
          "type": "5-years-fixed",
          "rate": 3.44
        },
        {
          "type": "10-years-fixed",
          "rate": 4.14
        }
      ]
    },
    {
      "provider": "Alterna Savings",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.9,
          "comment": "Prime + 0.20"
        },
        {
          "type": "3-years-fixed",
          "rate": 4.34
        },
        {
          "type": "5-years-fixed",
          "rate": 5.29
        },
        {
          "type": "10-years-fixed",
          "rate": 6.79
        }
      ]
    },
    {
      "provider": "MCAP",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 0,
          "comment": ""
        },
        {
          "type": "3-years-fixed",
          "rate": 0
        },
        {
          "type": "5-years-fixed",
          "rate": 0
        },
        {
          "type": "10-years-fixed",
          "rate": 0
        }
      ]
    },
    {
      "provider": "Scotiabank",
      "rates": [
        {
          "type": "5-years-variable",
          "rate": 3.5,
          "comment": "Prime - 0.20"
        },
        {
          "type": "3-years-fixed",
          "rate": 3.54
        },
        {
          "type": "5-years-fixed",
          "rate": 3.74
        },
        {
          "type": "10-years-fixed",
          "rate": 4.74
        }
      ]
    }
  ]
};

describe("skill-utils", function () {
	
	it("Mortgage Rates -> first rate is greater than 0.0", function () {
        const results = skillUtils.getLowestRates(payload, 2);
        assert(results[0].rate > 0.0);
        
	}).timeout(timeOut);
})