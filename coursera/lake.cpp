#include <iostream>
using namespace std;
int main () {


  int a, b, c, d;
  for (a = 1; a <= 4; a++) {
    for (b = 1; b <= 4; b++) {
      for (c = 1; c <=4; c++) {
        for (d = 1; d <= 4; d++) {
          if (
            (a + b + c + d) == 10 &&
            (a != b && a != c && a != d && b != c && b != d && c != d) &&
            ((b == 1) + (a == 4) + (c == 3) == 1) &&
            ((a == 1) + (b == 4) + (c == 2) + (d == 3) == 1) &&
            ((a == 4) + (b == 3) == 1) &&
            ((c == 1) + (d == 4) + (a == 2) + (b == 3) == 1)
            ) {
            cout << c << endl << b << endl << d << endl << a << endl;
          }
        }
      }
    }
  }

  return 0;
}



// #include<iostream>
// using namespace std;

// int main()
// {
//     int d,h,p,t, a[4];       //遍历所有可能的四大湖排名情况
//     for(d=1; d<=4; d++) {
//         for(h=1; h<=4; h++) {
//               for(p=1; p<=4; p++) {
//                 for(t=1; t<=4; t++) {
//                      if((d!=h&&d!=p&&d!=t&&h!=p&&h!=t&&p!=t) //保证每个湖的排名大小不同
//                           &&((d==3)+(h==1)+(p==2)+(t==4)==1)
//                           &&((d==2)+(h==4)+(p==3)+(t==1)==1)
//                           &&((h==3)+(t==4)==1)
//                           &&((d==1)+(h==3)+(p==4)+(t==2)==1)
//                           &&((d+h+p+t)==10)) {
//                         cout << d << endl << h << endl << p << endl << t<< endl;
//                         return 0; //好像有两个可能答案，但是oj只接收一个，所以输出第一个正确答案就够了
//                     }
//                 }
//                }
//           }
//      }
//     return 0;
// }