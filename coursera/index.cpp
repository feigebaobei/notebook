#include <iostream>
using namespace std;
int main () {


  int n = 0;
  cin >> n;
  int a[n];
  // for (int i = 0; i < n; i++ ) {
  //   cin >> a[n];
  // }
  int i = 0;
  while (i < n) {
    cin >> a[i];
    i++;
  }

  // while () {}
  bool flag = false;
  for (i = 0; i < n; i++) {
    if (a[i] == i) {
      flag = true;
      cout << a[i] << endl;
      break;
    }
  }
  if (!flag) {
    cout << 'N' << endl;
  }


  return 0;
}