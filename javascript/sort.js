/* 十大排序算法 */
// 冒泡排序
function bubbleSort ( array, orderType ) {
	orderType = orderType === undefined ? 'ascend' : orderType;
	for ( var i = 0, lenI = array.length - 1; i < lenI; i++ ) {
		for ( var j = 0, lenJ = array.length - 1 - i; j < lenJ; j++ ) {
			if ( orderType == 'ascend' ) {
				if ( array[j] > array[j+1] ) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
				}
			} 
			if ( orderType == 'decend' ) {
				if ( array[j] < array[j+1] ) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
				}
			}
		}
	}
	return array;
}
// 快速排序
var quickSort = function ( array, orderType ) {
	orderType = orderType === undefined ? 'ascend' : orderType;
	if ( array.length <= 1 ) {
		return array;
	}
	var pivotIndex = Math.floor( array.length / 2 );
	var pivot = array.splice( pivotIndex, 1 )[0];
	var left = [], right = [];
	for ( var i = 0, len = array.length; i < len; i++ ) {
		if ( orderType == 'ascend' ) {
			if ( array[i] < pivot ) {
				left.push( array[i] );
			} else {
				right.push( array[i] );
			}
		}
		if ( orderType == 'decend' ) {
			if ( array[i] > pivot ) {
				left.push( array[i] );
			} else {
				right.push( array[i] );
			}
		}
	}
	return quickSort(left,orderType).concat([pivot], quickSort(right,orderType) );
}
// 插入排序
function insertionSort( array, orderType ) {
 	var len = array.length,
 		orderType = orderType === undefined ? 'ascend' : orderType,
 		preIndex,
 		current;
 	for ( var i = 1; i < len; i++ ) {
 		preIndex = i - 1;
 		current = array[i];
 		switch ( orderType ) {
 			case 'ascend':
 			default:
		 		while ( preIndex >= 0 && array[preIndex] > current ) {
		 			array[preIndex+1] = array[preIndex];
		 			preIndex--;
		 		}
 				break;
 			case 'decend':
 				while ( preIndex >= 0 && array[preIndex] < current ) {
 					array[preIndex+1] = array[preIndex];
 					preIndex--;
 				}
 			break;
 		}
 		array[preIndex+1] = current;
 	}
 	return array;
}