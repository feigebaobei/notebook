#include <stdio.h>
// #include <string.h>

// int arrLen(int arr[]);

// void swap(int *, int *);
int arrMax(int *, int);

int main () {



int arr[] = {1,2,3,4,6,7,4,3};
int * parr = arr;
int * s2[3] = {&arr[0], &arr[1], &arr[2]};
int ** ps2 = s2;
// int max = arrMax(arr, len);
printf("%d %d %d\n", *(parr+0), *(parr+1), *(parr+2));
printf("%d %d %d\n", **(ps2+0), **(ps2+1), **(ps2+2));
printf("%d %d %d\n", **(s2+0), **(s2+1), **(s2+2));



  return 0;
}


int arrMax(int *arr, int len) {
  int i, maxVal = arr[0];
  for (i = 1; i < len; i++) {
    maxVal = maxVal < arr[i] ? arr[i] : maxVal;
  }
  return maxVal;
}