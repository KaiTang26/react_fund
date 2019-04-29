var axios = require("axios");

module.exports={
    fetchPopularRepos: function(lang){
        var url = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`);
        return(axios.get(url)
            .then(function(resp){
                console.log(resp.data.items);
                return resp.data.items;
            })
            .catch(function(error){
                console.log(error)
            }));
    }
};