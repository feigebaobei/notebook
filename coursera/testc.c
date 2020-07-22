#include <stdio.h>

#define MAXLINE 1000



int main() {


  int row = 0, col = 0;
  scanf("%d %d", &row, &col);
  int arr[row][col];
  for (int i = 0; i < row; i++) {
    for (int j = 0; j < col; j++) {
      arr[i][j] = 
    }
  }


  return 0;
}




#include <stdio.h>
#define M 100
#define N 100
void AlloverLURD(int a[][N],int row,int col) {
 // 左上bai到右下duzhi
 int i,j;
 for(i = 0; i < row; ++i)
 for(j = 0; j < col; ++j)
 printf("%d\n",a[i][j]);}
 void AlloverRULD(int a[][N],int row,int col) {
  // 右上dao到左下
  int i,j;
  for(i = 0; i < row; ++i)
    for(j = col - 1; j >= 0; --j)
      printf("%d\n",a[i][j]);}
int main() {
  int a[M][N],row,col,i,j;
  scanf("%d%d",&row,&col);
  for(i = 0; i < row; ++i)
    for(j = 0; j < col; ++j)
      scanf("%d",&a[i][j]);
    printf("左上右下遍历:\n");
    AlloverLURD(a,row,col);
    printf("右上左下遍历:\n");
    AlloverRULD(a,row,col);
  return 0;
}


