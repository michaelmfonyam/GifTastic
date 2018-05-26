 //Giphy API Key: OVM3fp3J9we3NdtHJn7XlvMXuX6lv6Dt

        var API_KEY = "OVM3fp3J9we3NdtHJn7XlvMXuX6lv6Dt";
        var animals = [
            "baboon", "bunny", "cat", "dog",
            "elephant", "fox", "giraffe", "horse", 
        
            "parrot", "rat",  "zebra"
        ];
        $(document).ready(function () {
            createButtons();
            getGifs(animals[0]);

            $("form").submit(function (event) {
                event.preventDefault();
                var newAnimal = $("#newAnimal").val();
                animals.push(newAnimal);
                createButtons();
            });

        });


        function createButtons() {

            var animalButtons = "";

            animals = animals.sort();

            animals.forEach(function (a) {
                animalButtons += `<button id=${a} class="animal-button btn btn-outline-primary">${a}</button>`;
            });

            $("#animals").html(animalButtons);

            $(".animal-button").click(function () {
                getGifs($(this).text());
            });

            $("#newAnimal").val("");

        }


        function getGifs(aAnimal) {
            $("#results").html("<h2>Loading.....</h2>");
            console.log("Getting " + aAnimal);

            $.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=funny+${aAnimal}&rating=pg&limit=10`).done(
                function (res) {
                    console.log("success got data", res);
                    var results = res.data;
                    var resGifs = "";
                    results.forEach(function (g) {
                        resGifs +=
                            `<img src="https://media3.giphy.com/media/${g.id}/giphy_s.gif" data-id=${g.id} alt="gif" class="gif still"/>`;
                    });

                    $("#results").html(resGifs);

                    $(".gif").click(function () {

                        var id = $(this).data("id");
                        if ($(this).hasClass("still")) {
                            $(this).removeClass("still");
                            $(this).attr("src", `https://media3.giphy.com/media/${id}/giphy.gif`);
                        } else {
                            $(this).addClass("still");
                            $(this).attr("src", `https://media3.giphy.com/media/${id}/giphy_s.gif`);
                        }

                    });
                });
        }