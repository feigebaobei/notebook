 #include <iostream>
 using namespace std;
 int main () {


   int n = 0;
   cin >> n;
   double idRate[100] = {0}; // 记录繁殖率
   int idOrder[100] = {0}; // 记录培养皿编号
   for (int i = 0; i < n; i++) {
     int id;
     double start, end;
     cin >> id >> start >> end;
     idOrder[i] = id;
     idRate[i] = double(end / start);
   }
   // rank
   for (int i = 0; i < n - 1; i++) {
     for (int j = i; j < n; j++) {
       if (idRate[i] > idRate[j]) {
         int rateTemp = 0;
         rateTemp = idRate[i];
         idRate[i] = idRate[j];
         idRate[j] = rateTemp;
         int idTemp = 0;
         idTemp = idOrder[i];
         idOrder[i] = idOrder[j];
         idOrder[j] = idTemp;
       }
     }
   }
   // max diff
   int maxDiff = 0, flagSplit = 0;
   for (int i = 0; i < n - 1; i++) {
     int diff = idRate[i + 1] - idRate[i];
     if (maxDiff < diff) {
       maxDiff = diff;
       flagSplit = i;
     }
   }
   // cout res
   cout << n - flagSplit - 1 << endl;
   for (int i = flagSplit + 1; i < n; i++) {
     cout << idOrder[i] << endl;
   }
   cout << flagSplit + 1 << endl;
   for (int i = 0; i <= flagSplit; i++) {
     cout << idOrder[i] << endl;
   }


   return 0;
 }
