#include <stdio.h>



int isDigest(int);
int isCharacter(int);


int main() {




    int m = 4, n = 4;
    int arr[m][n];
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        scanf("%d", &arr[i][j]);
      }
    }
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        printf("%d", arr[i][j]);
      }
    }

  // char a;
  // scanf("%c", &a);
  // printf("%c是数字吗？ %s\n", a, isDigest(a) ? "yes" : "no");
  // printf("%c是字母吗？ %s\n", a, isCharacter(a) ? "yes" : "no");



  return 0;
}

int isDigest (int a) {
  if (a >= 48 && a <= 57) {
    return 1;
  } else {
    return 0;
  }
}
int isCharacter (int a) {
  if ((a >= 65 && a <= 90) || (a >= 96 && a <= 122)) {
    return 1;
  } else {
    return 0;
  }
}
