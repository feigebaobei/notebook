
// 还需要修正。
#include <iostream>
using namespace std;
int main () {

  int a[6], oa[6], ea[6], even = 0, odd = 0;
  for (int i = 0; i < 6; i++) {
    cin >> a[i];
    if (a[i] & 1) {
        oa[odd] = a[i];
        odd++;
    } else {
        ea[even] = a[i];
        even++;
    }
  }
  int max = oa[0], min = ea[0];
  for (int i = 0; i < odd; i++) {
    max = max < oa[i] ? oa[i] : max;
  }
  for (int i = 0; i < even; i++) {
    min = min > ea[i] ? ea[i] : min;
  }
    int res = abs(max - min);
  cout << res << endl;


  return 0;
}
