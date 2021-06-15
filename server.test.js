const axios = require('axios');

const testLogger = (testName, actual, expectation) => {
    console.log(`${(actual === expectation) ? "PASS" : `FAIL. Got ${actual} instead of ${expectation}`} => ${testName}.`)
}

const apiCall = async (url, apiKey) => {
    const response = await axios.get(url, { headers: { 'X-API-KEY': apiKey } })
    return response
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// SHOULD RETURN 400 WHEN API IS NOT PROVIDED
const test1 = async () => {
    let url = 'http://localhost:3000/limit'
    let statusCode
    try {
        const response = await apiCall(url, "")
        statusCode = response.status
    } catch (err) {
        statusCode = err.response.status
    }
    testLogger("Should return status code 400 when API key is not provided", statusCode, 400)
    await sleep(1000)
}

// SHOULD RETURN 200 WHEN API IS PROVIDED
const test2 = async () => {
    let url = 'http://localhost:3000/limit'
    let statusCode
    try {
        const response = await apiCall(url, "LIMIT-TEST")
        statusCode = response.status
    } catch (err) {
        statusCode = err.response.status
    }
    testLogger("Should return status code 200 when API key is provided", statusCode, 200)
    await sleep(1000)
}

// should return 400 on the 11th request if all within a second
const test3 = async () => {
    let url = 'http://localhost:3000/limit'
    let statusCode

    try {
        for (let i = 0; i < 20; i++) {
            const response = await apiCall(url, "LIMIT-TEST")
        }
        statusCode = 200
    } catch (err) {
        statusCode = err.response.status
    }
    testLogger("Should return 400 on the 11th request within a second", statusCode, 400)
    await sleep(1000)
}

// should return 200s on multiple requsts if less than 10 a second
const test4 = async () => {
    let url = 'http://localhost:3000/limit'
    let statusCode
    let count = 0
    let currentSecond = Math.floor(Date.now() / 1000)
    let response
    try {

        for (let i = 0; i < 20; i++) {
            let time = Math.floor(Date.now() / 1000)
            if (time === currentSecond) {
                if (count >= 10) {
                    await sleep(1000)
                    count = 0
                    currentSecond = Math.floor(Date.now() / 1000)
                }
            }
            response = await apiCall(url, "LIMIT-TEST")
            count++

        }
        statusCode = response.status
    } catch (err) {
        console.log(err)
        statusCode = err
    }
    testLogger("Should return 200 on multiple requsts if less than 10 a second", statusCode, 200)
    await sleep(1000)
}

const runTests = async () => {
    await test1()
    await test2()
    await test3()
    await test4()
}

runTests()



