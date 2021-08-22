const rewire = require("rewire")
const index = rewire("./index")
const getChannels = index.__get__("getChannels")
const getCurrentChannelId = index.__get__("getCurrentChannelId")
// @ponicode
describe("getChannels", () => {
    test("0", () => {
        let callFunction = () => {
            getChannels({ channels: 1.0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getChannels({ channels: -1.0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getChannels({ channels: 0.0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getChannels({ channels: 10.0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getChannels({ channels: 0.5 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getChannels(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getCurrentChannelId", () => {
    test("0", () => {
        let callFunction = () => {
            getCurrentChannelId({ currentChannelId: "/people/%s/@self" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getCurrentChannelId({ currentChannelId: "c466a48309794261b64a4f02cfcc3d64" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getCurrentChannelId({ currentChannelId: "someUser" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getCurrentChannelId({ currentChannelId: "fake_user_id" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getCurrentChannelId({ currentChannelId: "A1234" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getCurrentChannelId(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
