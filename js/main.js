$(document).ready(function () {
    $('#searchUser').on('keyup', function (e) {
        let username = e.target.value;
        //Make request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '9b1b0295ac78dc9a01b1',
                client_secret: '2b2cb69a7efb6e5d40dfd3b8405fcb49693ddf63'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '9b1b0295ac78dc9a01b1',
                    client_secret: '2b2cb69a7efb6e5d40dfd3b8405fcb49693ddf63',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                   $('#repos').append(`
                        <div class="card text-center">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card-header">
                                        <h2 class="card-title">${repo.name}</h2>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">${repo.description}</p>
                                        <span class="badge badge-info">Watchers: ${user.watchers_count}</span>
                                        <span class="badge badge-primary">Forks: ${user.forks_count}</span>
                                        <span class="badge badge-success">Stars: ${user.stargazers_count}</span>
                                            <a class="btn btn-block btn-outline-primary" href="${repo.html_url}" target="_blank">Repo Page</a>                               
                                    </div>
                                </div>
                            </div>
                        </div>
                   `);
                });
            });
            $('#profile').html(`
                <div class="card">
                  <div class="card-header">
                    ${user.name}
                  </div>
                  <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail avatar " src="${user.avatar_url}" alt="user_image">
                            <a class="btn btn-primary btn-block mt-3" href="${user.html_url}" target="_blank">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                            <br>
                            <div id="badges">
                                <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
                                <span class="badge badge-info">Following: ${user.following}</span>
                                <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-success">Followers: ${user.followers}</span>
                            </div>
                        </div>
                        </div>
                  </div>
                </div>
                <br><br>
                <h3 class="page-header">Latest Repos</h3>
                <hr>
                <div id="repos"></div>
            `);
        });
    });
});