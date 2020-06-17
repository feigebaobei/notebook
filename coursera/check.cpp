#include <iostream>
#include <iomanip>
using namespace std;
int main () {


float sum[6] = {0};
for (int i = 0; i < 3; i++) {
  int a;
  cin >> a;
  int n;
  cin >> n;
  for (int j = 0; j < n; j++) {
    char b;
    cin >> b;
    float c;
    cin >> c;
    switch (b) {
      case 'A':
        sum[a-1] += c;
        sum[3] += c;
        break;
      case 'B':
        sum[a-1] += c;
        sum[4] += c;
        break;
      case 'C':
        sum[a-1] += c;
        sum[5] += c;
        break;
      default:
        break;
    }
  }
}
// for (int i = 0; i < 6; i++) {
//   cout << i + 1 << ' ' << sum[i] << endl;
// }
cout << 1 << ' ' << fixed << setprecision(2) << sum[0] << endl;
cout << 2 << ' ' << sum[1] << endl;
cout << 3 << ' ' << sum[2] << endl;
cout << 'A' << ' ' << sum[3] << endl;
cout << 'B' << ' ' << sum[4] << endl;
cout << 'C' << ' ' << sum[5] << endl;


 return 0;
}
