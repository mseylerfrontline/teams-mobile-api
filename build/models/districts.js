(function() {
  var districtSchema, mongoose;

  mongoose = require('mongoose');

  districtSchema = new mongoose.Schema({
    name: String,
    altName: String,
    id: String,
    num: String,
    accounts: {
      parent: {
        url: String,
        pages: [
          {
            name: String,
            icon: String,
            url: String,
            enabled: Boolean
          }
        ]
      },
      student: {
        url: String,
        pages: [
          {
            name: String,
            icon: String,
            url: String,
            enabled: Boolean
          }
        ]
      }
    },
    loc: {
      type: {
        type: String
      },
      coordinates: Array
    }
  });

  module.exports = mongoose.model('districts', districtSchema);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy9kaXN0cmljdHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0VBR1gsY0FBQSxHQUFxQixJQUFBLFFBQVEsQ0FBQyxNQUFULENBQWdCO0lBQ3BDLElBQUEsRUFBTSxNQUQ4QjtJQUVwQyxPQUFBLEVBQVMsTUFGMkI7SUFHcEMsRUFBQSxFQUFJLE1BSGdDO0lBSXBDLEdBQUEsRUFBSyxNQUorQjtJQUtwQyxRQUFBLEVBQVU7TUFDVCxNQUFBLEVBQVE7UUFDUCxHQUFBLEVBQUssTUFERTtRQUVQLEtBQUEsRUFBTztVQUNOO1lBQ0MsSUFBQSxFQUFNLE1BRFA7WUFFQyxJQUFBLEVBQU0sTUFGUDtZQUdDLEdBQUEsRUFBSyxNQUhOO1lBSUMsT0FBQSxFQUFTLE9BSlY7V0FETTtTQUZBO09BREM7TUFZVCxPQUFBLEVBQVM7UUFDUixHQUFBLEVBQUssTUFERztRQUVSLEtBQUEsRUFBTztVQUNOO1lBQ0MsSUFBQSxFQUFNLE1BRFA7WUFFQyxJQUFBLEVBQU0sTUFGUDtZQUdDLEdBQUEsRUFBSyxNQUhOO1lBSUMsT0FBQSxFQUFTLE9BSlY7V0FETTtTQUZDO09BWkE7S0FMMEI7SUE2QnBDLEdBQUEsRUFBSztNQUNKLElBQUEsRUFBTTtRQUFDLElBQUEsRUFBTSxNQUFQO09BREY7TUFFSixXQUFBLEVBQWEsS0FGVDtLQTdCK0I7R0FBaEI7O0VBb0NyQixNQUFNLENBQUMsT0FBUCxHQUFpQixRQUFRLENBQUMsS0FBVCxDQUFlLFdBQWYsRUFBNEIsY0FBNUI7QUF2Q2pCIiwiZmlsZSI6Im1vZGVscy9kaXN0cmljdHMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb25nb29zZSA9IHJlcXVpcmUgJ21vbmdvb3NlJ1xyXG5cclxuIyBTZXQgdXAgb3VyIHNjaGVtYSBhbmQgaXRzIHR5cGVzXHJcbmRpc3RyaWN0U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSB7XHJcblx0bmFtZTogU3RyaW5nXHJcblx0YWx0TmFtZTogU3RyaW5nXHJcblx0aWQ6IFN0cmluZ1xyXG5cdG51bTogU3RyaW5nXHJcblx0YWNjb3VudHM6IHtcclxuXHRcdHBhcmVudDoge1xyXG5cdFx0XHR1cmw6IFN0cmluZ1xyXG5cdFx0XHRwYWdlczogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5hbWU6IFN0cmluZ1xyXG5cdFx0XHRcdFx0aWNvbjogU3RyaW5nXHJcblx0XHRcdFx0XHR1cmw6IFN0cmluZ1xyXG5cdFx0XHRcdFx0ZW5hYmxlZDogQm9vbGVhblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fVxyXG5cdFx0c3R1ZGVudDoge1xyXG5cdFx0XHR1cmw6IFN0cmluZ1xyXG5cdFx0XHRwYWdlczogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5hbWU6IFN0cmluZ1xyXG5cdFx0XHRcdFx0aWNvbjogU3RyaW5nXHJcblx0XHRcdFx0XHR1cmw6IFN0cmluZ1xyXG5cdFx0XHRcdFx0ZW5hYmxlZDogQm9vbGVhblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fVxyXG5cdH1cclxuXHRsb2M6IHtcclxuXHRcdHR5cGU6IHt0eXBlOiBTdHJpbmd9XHJcblx0XHRjb29yZGluYXRlczogQXJyYXlcclxuXHR9XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsICdkaXN0cmljdHMnLCBkaXN0cmljdFNjaGVtYVxyXG4iXX0=