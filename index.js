// itt be van importálva pár dolog 

const users = new Users();

switch(urlObj.path) {
    case "/":
        users.getUsers();
        break;
    case "/user.html":
        const id = urlObj.query.id;
        users.getUser(id);
        break;
}