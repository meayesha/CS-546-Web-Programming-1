let exportedMethods={
    async getDetailsAboutMe(){
        let meObj={
            name: "Ayesha Parveen",
            cwid: "10471893",
            biography: "I am currently a graduate student pursuing MS in CS.\nI am enjoying the course so far!!! ",
            favouriteShows: ["Prison Break","Breaking Bad","Gotham","Money Heist", "Witcher"]
        };
        return meObj;
    }
}

module.exports= exportedMethods;