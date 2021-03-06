(function() {
  var Errors, User, hat;

  hat = require('hat');

  User = require('../models/users');

  Errors = require('./errors');

  exports.postUser = function(req, res) {
    var data, scope, secret;
    switch (req.body.type) {
      case "district":
        scope = ["write:districts", "read:districts"];
        secret = true;
        break;
      case "admin":
        scope = ["write:users", "read:users", "write:districts", "read:districts"];
        secret = true;
        break;
      case "public":
        scope = ["read:districts"];
        secret = false;
    }
    if (!req.body.name) {
      Errors.missingBody(res, "user", "name");
    } else if (!req.body.type) {
      Errors.missingBody(res, "user", "type");
    } else if (!scope) {
      Errors.invalidBody(res, "user", "type", req.query.type);
    } else {
      data = new User({
        name: req.body.name,
        key: hat(),
        secret: secret ? hat() : null,
        scope: scope
      });
      return data.save(function(err, user) {
        if (err) {
          Errors.internalSave(res, "user");
        } else {
          return res.send({
            status: "success",
            data: {
              user: {
                key: user.key,
                secret: user.secret
              }
            }
          });
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL3VzZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtBQUFBLE1BQUE7O0VBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSOztFQUdOLElBQUEsR0FBTyxPQUFBLENBQVEsaUJBQVI7O0VBQ1AsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSOztFQUVULE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFNBQUMsR0FBRCxFQUFLLEdBQUw7QUFHaEIsUUFBQTtBQUFBLFlBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFoQjtBQUFBLFdBQ1EsVUFEUjtRQUVNLEtBQUEsR0FBUSxDQUFDLGlCQUFELEVBQW9CLGdCQUFwQjtRQUNSLE1BQUEsR0FBUztBQUZQO0FBRFIsV0FJUSxPQUpSO1FBS00sS0FBQSxHQUFRLENBQUMsYUFBRCxFQUFnQixZQUFoQixFQUE4QixpQkFBOUIsRUFBaUQsZ0JBQWpEO1FBQ1IsTUFBQSxHQUFTO0FBRlA7QUFKUixXQU9RLFFBUFI7UUFRTSxLQUFBLEdBQVEsQ0FBQyxnQkFBRDtRQUNSLE1BQUEsR0FBUztBQVRmO0lBWUEsSUFBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBYjtNQUNHLE1BQU0sQ0FBQyxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLE1BQXhCLEVBQWdDLE1BQWhDLEVBREg7S0FBQSxNQUlLLElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQWI7TUFDRixNQUFNLENBQUMsV0FBUCxDQUFtQixHQUFuQixFQUF3QixNQUF4QixFQUFnQyxNQUFoQyxFQURFO0tBQUEsTUFJQSxJQUFHLENBQUMsS0FBSjtNQUNGLE1BQU0sQ0FBQyxXQUFQLENBQW1CLEdBQW5CLEVBQXdCLE1BQXhCLEVBQWdDLE1BQWhDLEVBQXdDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBbEQsRUFERTtLQUFBLE1BQUE7TUFNRixJQUFBLEdBQVcsSUFBQSxJQUFBLENBQUs7UUFDYixJQUFBLEVBQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQURGO1FBRWIsR0FBQSxFQUFLLEdBQUEsQ0FBQSxDQUZRO1FBR2IsTUFBQSxFQUFXLE1BQUgsR0FBZSxHQUFBLENBQUEsQ0FBZixHQUEwQixJQUhyQjtRQUliLEtBQUEsRUFBTyxLQUpNO09BQUw7YUFPWCxJQUFJLENBQUMsSUFBTCxDQUFVLFNBQUMsR0FBRCxFQUFLLElBQUw7UUFDUCxJQUFHLEdBQUg7VUFDRyxNQUFNLENBQUMsWUFBUCxDQUFvQixHQUFwQixFQUF5QixNQUF6QixFQURIO1NBQUEsTUFBQTtpQkFLRyxHQUFHLENBQUMsSUFBSixDQUFTO1lBQ04sTUFBQSxFQUFRLFNBREY7WUFFTixJQUFBLEVBQU07Y0FDSCxJQUFBLEVBQU07Z0JBQ0gsR0FBQSxFQUFLLElBQUksQ0FBQyxHQURQO2dCQUVILE1BQUEsRUFBUSxJQUFJLENBQUMsTUFGVjtlQURIO2FBRkE7V0FBVCxFQUxIOztNQURPLENBQVYsRUFiRTs7RUF2Qlc7QUFObkIiLCJmaWxlIjoiY29udHJvbGxlcnMvdXNlcnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjIE5vZGUgbW9kdWxlc1xuaGF0ID0gcmVxdWlyZSAnaGF0J1xuXG4jIEludGVybmFsIGRlcGVuZGVuY2llc1xuVXNlciA9IHJlcXVpcmUgJy4uL21vZGVscy91c2VycydcbkVycm9ycyA9IHJlcXVpcmUgJy4vZXJyb3JzJ1xuXG5leHBvcnRzLnBvc3RVc2VyID0gKHJlcSxyZXMpIC0+XG5cbiAgICMgSGFuZGxlIHNjb3BlcyBiYXNlZCBvbiB0eXBlIHNob3J0Y3V0c1xuICAgc3dpdGNoIHJlcS5ib2R5LnR5cGVcbiAgICAgIHdoZW4gXCJkaXN0cmljdFwiXG4gICAgICAgICBzY29wZSA9IFtcIndyaXRlOmRpc3RyaWN0c1wiLCBcInJlYWQ6ZGlzdHJpY3RzXCJdXG4gICAgICAgICBzZWNyZXQgPSB0cnVlXG4gICAgICB3aGVuIFwiYWRtaW5cIlxuICAgICAgICAgc2NvcGUgPSBbXCJ3cml0ZTp1c2Vyc1wiLCBcInJlYWQ6dXNlcnNcIiwgXCJ3cml0ZTpkaXN0cmljdHNcIiwgXCJyZWFkOmRpc3RyaWN0c1wiXVxuICAgICAgICAgc2VjcmV0ID0gdHJ1ZVxuICAgICAgd2hlbiBcInB1YmxpY1wiXG4gICAgICAgICBzY29wZSA9IFtcInJlYWQ6ZGlzdHJpY3RzXCJdXG4gICAgICAgICBzZWNyZXQgPSBmYWxzZVxuXG4gICAjIE1ha2luZyBzdXJlIHdlIGhhdmUgdmFsaWQgcGFyYW1ldGVyc1xuICAgaWYgIXJlcS5ib2R5Lm5hbWVcbiAgICAgIEVycm9ycy5taXNzaW5nQm9keShyZXMsIFwidXNlclwiLCBcIm5hbWVcIilcbiAgICAgIHJldHVyblxuXG4gICBlbHNlIGlmICFyZXEuYm9keS50eXBlXG4gICAgICBFcnJvcnMubWlzc2luZ0JvZHkocmVzLCBcInVzZXJcIiwgXCJ0eXBlXCIpXG4gICAgICByZXR1cm5cblxuICAgZWxzZSBpZiAhc2NvcGVcbiAgICAgIEVycm9ycy5pbnZhbGlkQm9keShyZXMsIFwidXNlclwiLCBcInR5cGVcIiwgcmVxLnF1ZXJ5LnR5cGUpXG4gICAgICByZXR1cm5cblxuICAgIyBObyBlcnJvcnNcbiAgIGVsc2VcbiAgICAgIGRhdGEgPSBuZXcgVXNlciB7XG4gICAgICAgICBuYW1lOiByZXEuYm9keS5uYW1lXG4gICAgICAgICBrZXk6IGhhdCgpXG4gICAgICAgICBzZWNyZXQ6IGlmIHNlY3JldCB0aGVuIGhhdCgpIGVsc2UgbnVsbFxuICAgICAgICAgc2NvcGU6IHNjb3BlXG4gICAgICB9XG5cbiAgICAgIGRhdGEuc2F2ZSAoZXJyLHVzZXIpIC0+XG4gICAgICAgICBpZiBlcnJcbiAgICAgICAgICAgIEVycm9ycy5pbnRlcm5hbFNhdmUocmVzLCBcInVzZXJcIilcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXMuc2VuZCB7XG4gICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiXG4gICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICBrZXk6IHVzZXIua2V5XG4gICAgICAgICAgICAgICAgICAgICBzZWNyZXQ6IHVzZXIuc2VjcmV0XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4iXX0=