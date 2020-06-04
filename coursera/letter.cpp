#include <iostream>
// #include <string>
using namespace std;

int main () {

  char s[80];
  int a = 0, e = 0, i = 0, u = 0, o = 0;
  cin.get(s, 80);
  for (int index = 0; index < 80; index++) {
    switch (s[index]) {
      case 'a':
        a++;
        break;
      case 'e':
        e++;
        break;
      case 'i':
        i++;
        break;
      case 'u':
        u++;
        break;
      case 'o':
        o++;
        break;
    }
  }
  cout << a << ' ' << e << ' ' << i << ' ' << o << ' ' << u << endl;

  return 0;
}




