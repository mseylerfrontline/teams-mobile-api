(function() {
  var Errors, User,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Errors = require('./errors');

  User = require('../models/users');

  exports.isAuthenticated = function(req, res, next) {
    var checkPermission;
    if (!req.query.key) {
      Errors.missingParam(res, 'auth', 'key');
      return;
    } else {
      User.findOne({
        key: req.query.key
      }, function(err, user) {
        if (err) {
          Errors.internalFind(res, "auth");
        } else if (!user) {
          Errors.failedAuth(res, "auth");
        } else if (user.secret && !req.query.secret) {
          Errors.missingParam(res, 'auth', 'secret');
        } else if (user.secret === !req.query.secret) {
          Errors.failedAuth(res, "auth");
        } else {
          switch (req.route.path) {
            case "/districts":
              switch (req.method) {
                case "GET":
                  return checkPermission("read:districts", user.scope);
                case "PUT":
                  return checkPermission("write:districts", user.scope);
              }
              break;
            case "/users":
              switch (req.method) {
                case "POST":
                  return checkPermission("write:users", user.scope);
              }
              break;
            default:
              return next();
          }
        }
      });
    }
    return checkPermission = function(permission, scope) {
      if (indexOf.call(scope, permission) >= 0) {
        next();
      } else {
        Errors.needPermission(res, "auth");
      }
    };
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2F1dGguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxZQUFBO0lBQUE7O0VBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSOztFQUNULElBQUEsR0FBTyxPQUFBLENBQVEsaUJBQVI7O0VBRVAsT0FBTyxDQUFDLGVBQVIsR0FBMEIsU0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLElBQVg7QUFFdkIsUUFBQTtJQUFBLElBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQWQ7TUFDRyxNQUFNLENBQUMsWUFBUCxDQUFvQixHQUFwQixFQUF5QixNQUF6QixFQUFpQyxLQUFqQztBQUNBLGFBRkg7S0FBQSxNQUFBO01BS0csSUFBSSxDQUFDLE9BQUwsQ0FBYTtRQUFDLEdBQUEsRUFBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQWhCO09BQWIsRUFBbUMsU0FBQyxHQUFELEVBQUssSUFBTDtRQUVoQyxJQUFHLEdBQUg7VUFDRyxNQUFNLENBQUMsWUFBUCxDQUFvQixHQUFwQixFQUF5QixNQUF6QixFQURIO1NBQUEsTUFJSyxJQUFHLENBQUMsSUFBSjtVQUNGLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEdBQWxCLEVBQXVCLE1BQXZCLEVBREU7U0FBQSxNQUlBLElBQUcsSUFBSSxDQUFDLE1BQUwsSUFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQTlCO1VBQ0YsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsR0FBcEIsRUFBeUIsTUFBekIsRUFBaUMsUUFBakMsRUFERTtTQUFBLE1BSUEsSUFBRyxJQUFJLENBQUMsTUFBTCxLQUFlLENBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFoQztVQUNGLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEdBQWxCLEVBQXVCLE1BQXZCLEVBREU7U0FBQSxNQUFBO0FBTUYsa0JBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFqQjtBQUFBLGlCQUVRLFlBRlI7QUFHTSxzQkFBTyxHQUFHLENBQUMsTUFBWDtBQUFBLHFCQUNRLEtBRFI7eUJBRU0sZUFBQSxDQUFnQixnQkFBaEIsRUFBa0MsSUFBSSxDQUFDLEtBQXZDO0FBRk4scUJBR1EsS0FIUjt5QkFJTSxlQUFBLENBQWdCLGlCQUFoQixFQUFtQyxJQUFJLENBQUMsS0FBeEM7QUFKTjtBQURFO0FBRlIsaUJBU1EsUUFUUjtBQVVNLHNCQUFPLEdBQUcsQ0FBQyxNQUFYO0FBQUEscUJBQ1EsTUFEUjt5QkFFTSxlQUFBLENBQWdCLGFBQWhCLEVBQStCLElBQUksQ0FBQyxLQUFwQztBQUZOO0FBREU7QUFUUjtxQkFlTSxJQUFBLENBQUE7QUFmTixXQU5FOztNQWQyQixDQUFuQyxFQUxIOztXQTBDQSxlQUFBLEdBQWtCLFNBQUMsVUFBRCxFQUFhLEtBQWI7TUFDZixJQUFHLGFBQWMsS0FBZCxFQUFBLFVBQUEsTUFBSDtRQUE0QixJQUFBLENBQUEsRUFBNUI7T0FBQSxNQUFBO1FBQXdDLE1BQU0sQ0FBQyxjQUFQLENBQXNCLEdBQXRCLEVBQTJCLE1BQTNCLEVBQXhDOztJQURlO0VBNUNLO0FBSDFCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2F1dGguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJFcnJvcnMgPSByZXF1aXJlICcuL2Vycm9ycydcblVzZXIgPSByZXF1aXJlICcuLi9tb2RlbHMvdXNlcnMnXG5cbmV4cG9ydHMuaXNBdXRoZW50aWNhdGVkID0gKHJlcSwgcmVzLCBuZXh0KSAtPlxuXG4gICBpZiAhcmVxLnF1ZXJ5LmtleVxuICAgICAgRXJyb3JzLm1pc3NpbmdQYXJhbShyZXMsICdhdXRoJywgJ2tleScpXG4gICAgICByZXR1cm5cblxuICAgZWxzZVxuICAgICAgVXNlci5maW5kT25lIHtrZXk6IHJlcS5xdWVyeS5rZXl9LCAoZXJyLHVzZXIpIC0+XG5cbiAgICAgICAgIGlmIGVyclxuICAgICAgICAgICAgRXJyb3JzLmludGVybmFsRmluZChyZXMsIFwiYXV0aFwiKVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgIGVsc2UgaWYgIXVzZXJcbiAgICAgICAgICAgIEVycm9ycy5mYWlsZWRBdXRoKHJlcywgXCJhdXRoXCIpXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgZWxzZSBpZiB1c2VyLnNlY3JldCBhbmQgIXJlcS5xdWVyeS5zZWNyZXRcbiAgICAgICAgICAgIEVycm9ycy5taXNzaW5nUGFyYW0ocmVzLCAnYXV0aCcsICdzZWNyZXQnKVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgIGVsc2UgaWYgdXNlci5zZWNyZXQgaXMgbm90IHJlcS5xdWVyeS5zZWNyZXRcbiAgICAgICAgICAgIEVycm9ycy5mYWlsZWRBdXRoKHJlcywgXCJhdXRoXCIpXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgZWxzZVxuXG4gICAgICAgICAgICBzd2l0Y2ggcmVxLnJvdXRlLnBhdGhcblxuICAgICAgICAgICAgICAgd2hlbiBcIi9kaXN0cmljdHNcIlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIHJlcS5tZXRob2RcbiAgICAgICAgICAgICAgICAgICAgIHdoZW4gXCJHRVRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQZXJtaXNzaW9uKFwicmVhZDpkaXN0cmljdHNcIiwgdXNlci5zY29wZSlcbiAgICAgICAgICAgICAgICAgICAgIHdoZW4gXCJQVVRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQZXJtaXNzaW9uKFwid3JpdGU6ZGlzdHJpY3RzXCIsIHVzZXIuc2NvcGUpXG5cbiAgICAgICAgICAgICAgIHdoZW4gXCIvdXNlcnNcIlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIHJlcS5tZXRob2RcbiAgICAgICAgICAgICAgICAgICAgIHdoZW4gXCJQT1NUXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUGVybWlzc2lvbihcIndyaXRlOnVzZXJzXCIsIHVzZXIuc2NvcGUpXG5cbiAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgIG5leHQoKVxuXG4gICBjaGVja1Blcm1pc3Npb24gPSAocGVybWlzc2lvbiwgc2NvcGUpIC0+XG4gICAgICBpZiBwZXJtaXNzaW9uIGluIHNjb3BlIHRoZW4gbmV4dCgpIGVsc2UgRXJyb3JzLm5lZWRQZXJtaXNzaW9uKHJlcywgXCJhdXRoXCIpXG4gICAgICByZXR1cm5cbiJdfQ==