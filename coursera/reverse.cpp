#include <iostream>
#include <cstring>
using namespace std;

void reverse (char a[]) {
  for (int i = 0; i < 10; i++) {
    cout << a[i];
  }
}

int main () {


  char str[500];
  cin.getline(str, 500);
  // for (int i = 0; i < 50; i++) {
  //   cout << str[i];
  // }
  // reverse(str)
  char temp[20] = {'\0'};
  for (int i = 0; i < 500 && str[i] != '\0'; i++) {
    if (str[i] != ' ') {
      strcat(temp, str[i]);
    } else {
      // temp = {'\0'};
      reverse(temp);
      strcpy(temp, '');
      cout << str[i];
    }
    // if (str[i] != ' ') {
    //   reverse(str);
    // } else {
    //   cout << str[i];
    // }

  }


  return 0;
}