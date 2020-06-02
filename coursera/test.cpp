#include<iostream>
using namespace std;

//一共最多有300只猴子
int succedent[300]; //这个数组用于保存一个猴子后一位是谁，
      //比如“next[5]的值是7”就是说5号猴子的下一位是7号猴子，6号猴子已经在之前退出了。
int precedent[300];//这个数组用于保存一个猴子前一位是谁，用法和上面的类似。

int main() {
  int n, m;
  while (true) {
    cin >> n >> m;
    if (n == 0 && m == 0)
      break;
    for (int i = 0; i < n - 1; i++) {
      succedent[i] = i + 1;
      precedent[i + 1] = i;
    }
    succedent[n - 1] = 0;
    precedent[0] = n - 1;

    int current = 0;
    while (true) {
      //如果一共要报m次号，那么取m-1次succedent之后就是需要退出的那只猴子
      for (int count = 0; count < m-1; count++)
        current = succedent[current];

      int pre = precedent[current];
      int suc = succedent[current];
      //让current号猴子退出很简单，就是把前一位的“下一位”指向current的下一位，
      //下一位的“前一位”指向current的前一位就好了
      succedent[pre] = suc;
      precedent[suc] = pre;
      if (pre == suc) {
        //如果只剩下两个了，那么每个人的前位和后位就是同一个了。
        //current是退出的，那么另一个就是剩下的。
        //我们的序号是从0编号的，输出时要加一
        cout << pre+1 << endl;
        break;
      }
      current = suc;
    }
  }
  return 0;
}





#include<iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  int sumn = 0, sumd = 1;//储存结果，sumn/sumd
  while (n--) {
    int num, deno;
    char slash;//专门用来吃掉/的
    cin >> num >> slash >> deno;
    //先相加 a/b + c/d = (a*d+c*b)/(b*d)
    sumn = sumn*deno + num*sumd;
    sumd = sumd*deno;
  }
  //后约分
  //先求最大公约数gcd，这里用的是欧几里得法
  int a = sumd, b = sumn, c;
  while (a != 0) {
    c = a; a = b%a; b = c;
  }
  int gcd = b;
  //分子分母同时除以gcd就可以完成约分
  sumd /= gcd;
  sumn /= gcd;
  if (sumd > 1)
    cout << sumn << '/' << sumd << endl;
  else
    cout << sumn << endl;
  return 0;
}





//
//  seperate.cpp
//  first
//
//  Created by feigebaobei on 2020/5/16.
//  Copyright © 2020 feigebaobei. All rights reserved.
//

#include <iostream>
using namespace std;

int main () {
    var n = 0;
    cin << n;
    var 
    return 0;
}







#include <iostream>
using namespace std;
int main () {
    int best = 0;
    for (best = 1; best <= 4; best++) {
        bool a = (best == 2);
        bool b = (best == 4);
        bool c = !(best == 3);
        bool d = !b;
        if (a+b+c+d != 1) continue;
        cout << best << endl;
        if (a==1)
          cout << 'A' << endl;
        else if (b == 1)
          cout << 'B' << endl;
        else if (c == 1)
          cout << 'C' << endl;
        else
          cout << 'D' << endl;
    }
    return 0;
}





#include <iostream>
using namespace std;
int main () {


    int a[6], sum = 0;
    for (int i = 0; i<6; i++) {
        cin >> a[i];
      if (i > 0 && a[i] < a[0]) {
          sum += a[i];
      }
    }
    return sum;
}






#include <iostream>
using namespace std;
int main () {


    int s = 0;
    float tBike = 27 + 23 + s/3;
    float tWalk = s/1.2;
    if (tBike > tWalk) {
      cout << "Walk" << endl;
    } else if (tBike < tWalk){
      cout << "Bike" << endl;
    } else {
      cout << "All" << endl;
    }

    return 0;
}





#include <iostream>
using namespace std;
int main () {


int n = 0, k = 0;
int x = 0;
while(cin >> n >> k) {
  for (; x < 20; x++) {
    int mmy = 0, mh = 0;
    mmy = n * x;
    mh = 200 * (1+k/100);
    if (mmy > mh) {
      cout << x << endl;
      break;
    }
  }
  cout << "Impossible" << endl;
}

    return 0;
}




#include <iostream>
using namespace std;
int main () {



int n = 0, k = 0;
cin >> n >> k;
    int a[n];
for (int i = 0; i<n; i++) {
    cin >> a[i];
}

  for (int i = 0; i<n-1; i++) {
    for (int j = i+1; j<n; j++) {
      if (a[i] + a[j] == k) {
        // b = false
        cout << "yes" << endl;
      }
    }
  }
  cout << "no" << endl;



    return 0;
}





#include <iostream>
using namespace std;
int main () {


int n = 10;
cin >> n;
for (int i = 10; i < n; i++) {
  // 得到m
  int m = n % 10 + n / 10;
  // if
  if (n % m == 0) {
    cout << n << endl;
  }
}


    return 0;
}



// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-



#include <iostream>
using namespace std;
int main () {


    int n = 0, x = 0, y = 0;
    cin >> n >> x >> y;
    int c = y / x;
    if (y % x != 0) {
        c++;
    }
    cout << n - c << endl;

  return 0;
}


#include <iostream>
using namespace std;
int main () {

  int h = 0, r = 0; // cm
  float Pi = 3.14159;
  cin >> h >> r;
  float hf = h / 10, rf = r / 10;
  cout << hf << rf << endl;
  float v = rf * rf * Pi * hf;
  int res = 20 / v;
  cout << res++ << endl;

  return 0;
}


#include <iostream>
using namespace std;
int main () {

  int n = 0;
  cin >> n;
  int a[n];
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  int max = 0;
  for (int i = 0; i < n; i++) {
    if (max < a[i]) {
      max = a[i];
    }
  }
  cout << max << endl;

  return 0;
}

// 还需要修正。
#include <iostream>
using namespace std;
int main () {

  int a[6], oa[], ea[], even = 0, odd = 0;
  for (int i = 0; i < 6; i++) {
    cin >> a[i];
    if (odd & 1) {
      even++;
      ea.push(a[i])
    } else {
      odd++;
      oa.push(a[i])
    }
  }
  cout << ea << oa << endl;
  int max = 0, min = 0;
  for (int i = 0; i < odd; i++) {
    max = max < oa[i] : oa[i] : max;
  }
  for (int i = 0; i < odd; i++) {
    min = min > ea[i] : ea[i] : min;
  }
  int res = abs(max - min)
  cout << res << endl;


  return 0;
}


#include <iostream>
using namespace std;
int main () {


  int n = 0;
  cin >> n;
  int a = 0, b = 0, c = 0;
  a = n % 10;
  n = n/10;
  b = n % 10;
  n /= 10;
  c = n % 10;
  // cout a << b << c << endl;
  cout << c << endl;
  cout << b << endl;
  cout << a << endl;


  return 0;
}