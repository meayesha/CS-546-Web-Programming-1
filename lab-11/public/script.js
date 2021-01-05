$(document).ready(()=>{
    $.ajax({
        url: ` http://api.tvmaze.com/shows`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        dataType: 'json'
    }).then((data)=>{
        $('#showList').empty();
        $('#homeLink').hide();
        data.map((show)=>{
            $('#show').hide();
            let li= `<li><a class= 'showLink' href='${show._links.self.href}'>${show.name}</a></li>`;
            $('#showList').show();
            $('#showList').append(li);
        });
        $('a.showLink').click((e)=>{
            e.preventDefault();
            linkClick(e.target.href);
        });
    });

    $('#searchForm').submit((e) => {
        e.preventDefault();

        if($('#search_term').val().trim()){
            $('#errorDiv').hide();
            $('#show').empty();
            $('#showList').empty();
            $.ajax({
                url: `http://api.tvmaze.com/search/shows?q=${$('#search_term').val()}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'GET',
                dataType: 'json',
            }).then((data) => {
                data.map((searchResults) => {
                    let { show } = searchResults;

                    let li = `<li><a class='showLink' href='${show._links.self.href}'>${show.name}</a></li>`
                    $('#showList').append(li);
                });
                $('a.showLink').click((e) => {
                    e.preventDefault();
                    linkClick(e.target.href);
                });
                $('#search_term').val('');
                $('#show').hide();


            });
                $('#showList').show();
                $('#homeLink').show();
                
            }else{
                $('#errorDiv').html('You must enter a search value');
                $('#errorDiv').show();
                $('#search_term').val('');
                $('#search_term').focus();
            }
    });
    function linkClick(val){
        $('#show').empty();
        $.ajax({
            url: val,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            dataType: 'json'
        }).then((data) => {
            data.genres.map((item) => console.log(`<li>${item}</li>`));
            let html = `
            <h1>${data.name}</h1>
            <img alt= "${data.name}" src="${data.image && data.image.medium ? data.image.medium : '/public/No_Image_Available.jpg'}">
            <dl>
                <dt>Language</dt>
                    <dd>${data.language ? data.language : 'N/A'} </dd>
                <dt>Genres</dt>
                    <dd>
                        <ul>
                            ${data.genres ? data.genres.map((item) => `<li>${item}</li>`).join('') : `<li>'N/A'</li>`}
                        </ul>
                    </dd>
                <dt> Average rating </dt>
                    <dd>${data.rating && data.rating.average ? data.rating.average : 'N/A'}</dd>
                <dt>Network</dt>
                    <dd>${data.network ? data.network.name : 'N/A'}</dd>
                <dt>Summary</dt>
                    <dd>${data.summary ? data.summary : 'N/A'}</dd>
            </dl>
        `;
        $('#show').append(html);
        $('#showList').hide();
        $('#show').show();
        $('#homeLink').show();
        });
    }
});