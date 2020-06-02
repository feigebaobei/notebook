
#include <iostream>
#include <iomanip>
using namespace std;
int main () {

  int n = 0;
  cin >> n;
    int all[n];
    double a = 0.0, b = 0.0, c = 0.0, d = 0.0;
  for (int i = 0; i < n; i++) {
    cin >> all[i];
    if (all[i] < 19) {
      a++;
    } else {
      if (all[i] >= 19 && all[i] < 36) {
        b++;
      } else {
        if (all[i] >= 36 && all[i] < 61) {
          c++;
        } else {
          d++;
        }
      }
    }
  }
  double sum = a + b + c + d;
    cout << setprecision(2) << a * 100 / sum << endl;
    cout << "1-18: " << setprecision(4) << float(a * 1.0 / sum * 1.0) * 100.0;
    cout << "%" << endl;
//    float f = 12.4567;
//    cout << setprecision(2) << f;

  return 0;
}




// 10
// 1 11 21 31 41 51 61 71 81 91