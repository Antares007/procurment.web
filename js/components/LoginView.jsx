var React = require('react/addons');

var LoginView = React.createClass({
  render: function() {
    return (
      <div>
        <h1>LoginView</h1>
        <a href="/auth/facebook">LogIn with fb</a>
        <a href="/auth/google">LogIn with G+</a>
        <form action="/login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
      </div>
    );
  }
});

module.exports = LoginView;
