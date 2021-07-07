// const { v4 } = require('uuid');

const findObj = (body) => {
    const { id } = body;

    const data = global.mockData.pdvService.find((el) => el.id === id);

    return data || null;
};

const accountServiceMethods = {
    authLogin: (req, res) =>{
        const tokenInfo = global.mockData.accountService.auth[0];

        return res.status(200).json(tokenInfo);
    },
    integrations: (req, res)=> {
        console.log(req.params);
        const integrations = global.mockData.accountService.integrations;

        return res.status(200).json(integrations);
    }
};

module.exports = {
    setItem: (req, res) => {
        const data = req.body;

        global.mockData.pdvService.push(data);

        return res.status(200).send();
    },
    getItem: (req, res) => {
        return res.status(200).json(findObj(req.body));
    },
    accountServiceMethods
};
