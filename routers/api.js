const express = require("express");
const app = express.Router();
const path = require("path");

const crypto = require('crypto');
const fs = require('fs');

const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");


app.get("/hotconfigs/v2/livefn.json", async (req, res) => {
    res.set("content-type", "application/json");
    res.sendFile(path.join(__dirname, "../responses/hotconfigs/livefn.json"));
});
app.get("/content/api/pages/fortnite-game", (req, res) => {
    const apiUrl = `https://fortnitecontent-website-prod07.ol.epicgames.com${req.originalUrl}`;
    const headers = {
        "user-agent": req.headers["user-agent"],
        "accept-language": req.headers["accept-language"]
    };

    fetch(apiUrl, { headers })
        .then(response => response.json())
        .then(data => {
            if (data["emergencynoticev2"]) {
                data["emergencynoticev2"]["emergencynotices"]["emergencynotices"] = [
                    {
                        "hidden": false,
                        "_type": "CommonUI Emergency Notice Base",
                        "title": "SakuraFN",
                        "body": "Welcome to sakuraFN."
                    }
                ];
            }
            res.json(data);
        })
        .catch(error => {
            res.status(500).send('Internal Server Error');
        });
});




//                                                                                                                                                                                                                  Made by iron web10  


app.get("/sdk/v1/default", async (req, res) => {
    const response = require("../responses/sdk/default.json");
    res.json(response);
});

app.get("/sdk/v1/product/prod-fn", async (req, res) => {
    const response = require("../responses/sdk/product.json");
    res.json(response);
});

app.post("/auth/v1/oauth/token", async (req, res) => {
    if (req.body.grant_type == "client_credentials") {
        const access_token = jsonwebtoken.sign({
            "clientId": "ec684b8c687f479fadea3cb2ad83f5c6",
            "role": "GameClient",
            "productId": "prod-fn",
            "iss": "eos",
            "env": "prod",
            "organizationId": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
            "features": [
              "AntiCheat",
              "Connect",
              "ContentService",
              "Ecom",
              "EpicConnect",
              "Inventories",
              "LockerService",
              "Matchmaking Service"
            ],
            "deploymentId": req.body.deployment_id,
            "sandboxId": "fn",
            "tokenType": "clientToken",
            "exp": 1739852154,
            "iat": 1739848554,
            "jti": crypto.randomBytes(16).toString("hex")
        }, "sakura");
        res.json({
            "access_token": access_token,
            "token_type": "bearer",
            "expires_at": new Date(new Date().getTime() + 3600 * 1000).toISOString(),
            "features": [
                "AntiCheat",
                "Connect",
                "ContentService",
                "Ecom",
                "EpicConnect",
                "Inventories",
                "LockerService",
                "Matchmaking Service"
            ],
            "organization_id": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
            "product_id": "prod-fn",
            "sandbox_id": "fn",
            "deployment_id": req.body.deployment_id,
            "expires_in": 3600
        });
    }

    if (req.body.grant_type == "external_auth") {
        const access_token = jsonwebtoken.sign({
            "clientId": "ec684b8c687f479fadea3cb2ad83f5c6",
            "role": "GameClient",
            "productId": "prod-fn",
            "iss": "eos",
            "env": "prod",
            "nonce": req.body.nonce,
            "organizationId": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
            "features": [
              "AntiCheat",
              "Connect",
              "ContentService",
              "Ecom",
              "EpicConnect",
              "Inventories",
              "LockerService",
              "Matchmaking Service"
            ],
            "productUserId": "SakuraPlayer",
            "organizationUserId": "SakuraPlayer",
            "clientIp": "000.000.000.00",
            "deploymentId": req.body.deployment_id,
            "sandboxId": "fn",
            "tokenType": "userToken",
            "exp": 1739852164,
            "iat": 1739848564,
            "account": {
              "idp": "epicgames",
              "displayName": "SakuraPlayer",
              "id": "SakuraPlayer",
              "plf": "other"
            },
            "jti": crypto.randomBytes(16).toString("hex")
        }, "sakura");
        const id_token = jsonwebtoken.sign({
            "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
            "sub": "SakuraPlayer",
            "pfsid": "fn",
            "act": {
              "pltfm": "other",
              "eaid": "SakuraPlayer",
              "eat": "epicgames"
            },
            "pfdid": req.body.deployment_id,
            "iss": "https://api.epicgames.dev/auth/v1/oauth",
            "exp": 1739852164,
            "tokenType": "idToken",
            "iat": 1739848564,
            "pfpid": "prod-fn"
        }, "sakura");
        res.json({
            "access_token": access_token,
            "token_type": "bearer",
            "expires_at": new Date(new Date().getTime() + 3600 * 1000).toISOString(),
            "nonce": req.body.nonce,
            "features": [
                "AntiCheat",
                "Connect",
                "ContentService",
                "Ecom",
                "EpicConnect",
                "Inventories",
                "LockerService",
                "Matchmaking Service"
            ],
            "organization_id": "o-aa83a0a9bc45e98c80c1b1c9d92e9e",
            "product_id": "prod-fn",
            "sandbox_id": "fn",
            "deployment_id": req.body.deployment_id,
            "organization_user_id": "SakuraPlayer",
            "product_user_id": "SakuraPlayer",
            "product_user_id_created": false,
            "id_token": id_token,
            "expires_in": 3600
        });
    }
});

app.post("/epic/oauth/v2/token", async (req, res) => {
    // const token_decode = jsonwebtoken.decode(req.body.refresh_token.replace("eg1~", ""), "sakura");

    const access_token = jsonwebtoken.sign({
        "sub": "SakuraPlayer",
        "pfsid": "fn",
        "iss": "https://api.epicgames.dev/epic/oauth/v1",
        "dn": "SakuraPlayer",
        "nonce": "n-kXyydoobrGEbOAzGl/7TUWX81q4=",
        "pfpid": "prod-fn",
        "sec": 1,
        "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
        "pfdid": req.body.deployment_id,
        "t": "epic_id",
        "scope": `${req.body.scope} offline_access presence`,
        "appid": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
        "exp": 1739857495,
        "iat": 1739850295,
        "jti": crypto.randomBytes(16).toString("hex")
    }, "sakura");
    const refresh_token = jsonwebtoken.sign({
        "sub": "SakuraPlayer",
        "pfsid": "fn",
        "iss": "https://api.epicgames.dev/epic/oauth/v2",
        "dn": "SakuraPlayer",
        "pfpid": "prod-fn",
        "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
        "pfdid": req.body.deployment_id,
        "t": "epic_id_r",
        "appid": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
        "scope": `${req.body.scope} offline_access presence`,
        "iat": 1739850295,
        "jti": crypto.randomBytes(16).toString("hex")
    }, "sakura");
    const id_token = jsonwebtoken.sign({
        "sub": "SakuraPlayer",
        "pfsid": "fn",
        "iss": "https://api.epicgames.dev/epic/oauth/v1",
        "dn": "SakuraPlayer",
        "nonce": "n-mWvYXpsVwfbR76Qyx6QHPwMVUD8=",
        "pfpid": "prod-fn",
        "aud": "ec684b8c687f479fadea3cb2ad83f5c6",
        "pfdid": req.body.deployment_id,
        "t": "id_token",
        "appid": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
        "exp": 1739857495,
        "iat": 1739850295,
        "jti": crypto.randomBytes(16).toString("hex")
    }, "sakura");
    res.json({
        "scope": `${req.body.scope} offline_access presence`,
        "token_type": "bearer",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "id_token": id_token,
        "expires_in": 7200,
        "expires_at": new Date(new Date().getTime() + 7200 * 1000).toISOString(),
        "account_id": "SakuraPlayer",
        "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
        "application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
        "selected_account_id": "SakuraPlayer",
        "merged_accounts": [],
        "acr": "AAL1",
        "auth_time": new Date().toISOString(),
    });
});

app.get("/epic/id/v2/sdk/accounts", async (req, res) => {
    res.json([{
        "accountId": req.query.accountId,
        "displayName": req.query.accountId,
        "preferredLanguage": "ja",
        "cabinedMode": false,
        "empty": false
    }]);
});

app.get("/epic/friends/v1/:account_id/blocklist", async (req, res) => {
    res.json({
        "blockedUsers": []
    });
});

app.get("/api/v1/public/accounts", async (req, res) => {
    res.json({
        "accounts": [
            {
                "accountId": req.query.accountId,
                "tags": []
            }
        ]
    });
});

app.post("/auth/v1/turn/credentials", async (req, res) => {
    res.json({
        "username": "Sakura",
        "password": "Server",
        "ttl":3600000,
        "uris":[]
    });
});

app.patch("/v1/epic-settings/public/users/:account_id/values", async (req, res) => {
    res.json({
        "response": {
            "settings": []
        },
        "meta": {
            "requestId": "EOS-SakuraServer",
            "timestamp": new Date().toISOString(),
        }
    });
});

app.get("/v1/epic-settings/public/users/:account_id/values", async (req, res) => {
    res.json({
        "response": {
            "settings": []
        },
        "meta": {
            "requestId": "EOS-SakuraServer",
            "timestamp": new Date().toISOString(),
        }
    });
});

app.get("/api/locker/v4/:deployment_id/account/:account_id/items", async (req, res) => {
    res.json({
        "activeLoadoutGroup": {
            "deploymentId": req.params.deployment_id,
            "accountId": req.params.account_id,
            "athenaItemId": "9092ba65-01e8-4598-9c09-6de6be10ea49",
            "creationTime": new Date().toISOString(),
            "updatedTime": new Date().toISOString(),
            "loadouts": {
                "CosmeticLoadout:LoadoutSchema_Emotes": {
                    "loadoutSlots": [],
                    "shuffleType": "DISABLED"
                },
                "CosmeticLoadout:LoadoutSchema_Platform": {
                    "loadoutSlots": [],
                    "shuffleType": "DISABLED"
                },
                "CosmeticLoadout:LoadoutSchema_Wraps": {
                    "loadoutSlots": [],
                    "shuffleType": "DISABLED"
                },
                "CosmeticLoadout:LoadoutSchema_Vehicle": {
                    "loadoutSlots": [],
                    "shuffleType": "DISABLED"
                },
                "CosmeticLoadout:LoadoutSchema_Character": {
                    "loadoutSlots": [],
                    "shuffleType": "DISABLED"
                }
            },
            "shuffleType": "DISABLED"
        },
        "loadoutGroupPresets": [],
        "loadoutPresets": []
    });
});

app.get("/api/v1/lfg/Fortnite/users/:account_id/settings", async (req, res) => {
    res.json({
        "isLookingForGroup": false,
        "preferredRegion": "ASIA"
    });
});

app.post("/catalog/api/shared/namespace/fn/bulk/offers", async (req, res) => {
    const response = require("../responses/catalog/offers.json");
    res.json(response);
});

app.get("/api/v2/interactions/:interaction_type/Fortnite/:account_id", async (req, res) => {
    res.json({
        "aggregatedInteractions": []
    });
});

app.put("/v1/rebootrally/eligibility/friends", async (req, res) => {
    res.json({
        "eligibility": []
    });
});

app.put("/api/v1/events/:game_id/download/:account_id", async (req, res) => {
    res.json({
        "player": {
          "tokens": [],
          "gameId": req.params.game_id,
          "accountId": req.params.account_id,
          "teams": {},
          "pendingPayouts": [],
          "pendingPenalties": {},
          "persistentScores": {},
          "groupIdentity": {}
        },
        "scoringRuleSets": {},
        "payoutTables": {},
        "events": [],
        "templates": [],
        "scores": [],
        "leaderboardDefs": [],
        "scoreLocationScoringRuleSets": {},
        "scoreLocationPayoutTables": {},
        "resolvedWindowLocations": {},
        "eventSeries": []
    });
});

module.exports = app;

