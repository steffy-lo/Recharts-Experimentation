import axios from "axios";

/* For local debugging set to 1 */
const DEBUG = 1;

/* Debug variables.*/
const PREFIX = DEBUG ? "http://localhost:80" : "";

export const getUsageData = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(PREFIX + "/data")
            .then(res => {
                if (!res || !res.data)
                    reject({ stat: 500, msg: "Something went wrong" });
                resolve(res.data.result);
            })
            .catch(err => {
                reject({
                    stat: err.response.status,
                    msg:
                        "There was an error processing your request. Please, try again later."
                });
            });
    });
};