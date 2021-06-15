const apiLimitTracker = {}

// let sampleAPIObject = {
//     "VIADUCT_TEST": {
//         current: {
//             "0001": 1
//         },
//         lifeTimeCount: 0
//     }
// }

module.exports.validateAPIKey = (token) => {
    // accepting any keys for now
    if (token) {
        return true
    } else {
        return false
    }
}

module.exports.validateRateLimit = apiKey => {
    let currentSecond = Math.floor(Date.now() / 1000)

    // is api key in apiLimitTracker
    // using in memory cache for now, REDIS could be a better option for scalability
    // see README for more notes
    const apiStatus = updateLimitTracker(apiKey, currentSecond)
    const isRateAcceptable = apiStatus["current"][currentSecond] <= 10
    return { isRateAcceptable, apiStatus }
}

module.exports.apiStatus = () => {
    return apiLimitTracker
}

const updateLimitTracker = (apiKey, currentSecond) => {
    if (apiLimitTracker[apiKey]) {
        // check if key has active active hits for current second 
        const isCurrentSecondActive = currentSecond in apiLimitTracker[apiKey]["current"]

        // increment counter for current second if active
        if (isCurrentSecondActive) {
            apiLimitTracker[apiKey]["current"][currentSecond] += 1
        } else {
            apiLimitTracker[apiKey]["current"] = {
                [currentSecond]: 1
            }
        }
    } else {
        // if new key, add to tracker
        apiLimitTracker[apiKey] = {
            current: {
                [currentSecond]: 1
            },
            lifeTimeCount: 0
        }
    }

    // increment liftime count for api key
    apiLimitTracker[apiKey]["lifeTimeCount"] += 1
    return apiLimitTracker[apiKey]
}



