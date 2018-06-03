#vue-draggable  

##Description  

使本地的html5对于vue可以拖放。  
基于Sortable.js  
（*tip:*  我的dome里没有引入sortable.js，只引入了vuedraggable也能正常运行。）  

##Feature  

- 支持sortable.js的全部特征
- 保持视图模型和html同步
- 兼容vue.js 2.0 transition-group
- 支持取消
- 当需要全部控制时事件会报告所有的变化。（*Events reporting any changes when full control is needed*）  

##支持vue.js 2.0  

**Typical use**  

	<draggable v-model="myArray" :options="group:'people'" @start="drag=true" @end="drag=false">
		<div v-for="element in myArray" :key="element.id">{{element.name}}</div>
	</draggable>

**.vue**  

	import draggable from 'vuedraggable'
	...
	export default {
		components: {
			draggable
		},
	}
	...

**With transition-group:**  

	<draggable v-model="myArray">
		<transition-group>
			<div v-for="element in myArray" :key="element.id">
				{{element.name}}
			</div>
		</transition-group>
	</draggable

可拖动组件应当直接包裹draggable元素，或者transition-component包括可拖动的元素。  

**with footer slot**  

	<draggable v-model="myArray" :options="{draggable:'.item'}">
	    <div v-for="element in myArray" :key="element.id" class="item">
	        {{element.name}}
	    </div>
	    <button slot="footer" @click="addPeople">Add</button>
	</draggable>

**with Vuex:**  

	<draggable v-model="myList"></draggable>

	computed: {
		myList: {
			get() {
				return this.$store.state.myList
			},
			set() {
				this.$store.commit('updateList', value)
			}
		}
	}

**Props**  

**value**  
引入一个数组做为内部元素的v-for指令使用。  

**list**
它基本与value相同。不同点是list同步与拖出和放入事件。list使用splice方法处理数组。这个参数不能与value同时存在，只能二选一。  

**options**  
用于初始化sortable。这里的所有方法需要使用“on”开头。这样才能使用sortable里的事件。  

**element**  
用于指定draggabel组件被创建为什么html标签。也可以使用vue组件里的element。如果需要设置参数或事件时可以参考componentData去创建组件。  

**clone**  
当option里的clone参数值是true时，原组件会克隆元素。viewModel元素被克隆为独一无二的参数并返回被克隆后的版本。  

**move**  
当这个参数是空时会返回sortable的onMove方法。如果返回false会取消drag操作。
	function onMoveCallback(evt, originalEvent) {
		...
		// return false; - for cancel
	} 

evt对象拥有和sortable onMove 事件相同的性质，并且还加了3个性质。  

拖动的元素：index, element, futureIndex  
相关的元素：index, element, list, component

- draggedContext: context linked to dragged element
	- index: dragged element index
	- element: dragged element underlying view model element
	- futureIndex: potential index of the dragged element if the drop operation is accepted
- relatedContext: context linked to current drag operation
	- index: target element index
	- element: target element view model element
	- list: target list
	- component: target VueComponent

html:  

	<draggable :list="list" :move="checkMove">

javascript:  

	checkMove: function(evt) {
		return (evt.draggedContext.element.name!=='apple');
	}


**componentData**  
用于传递附加信息给子组件。使用element参数声明。  
它有2个参数：  
props: 把信息传递给子组件  
on: 当发生相应事件时  

html:  

	<draggable element="el-collapse" :list="list" :component-data="getComponentData()">
    	<el-collapse-item v-for="e in list" :title="e.title" :name="e.name" :key="e.name">
	        <div>{{e.description}}</div>
	    </el-collapse-item>
	</draggable>

vue:  

	methods: {
		handleChange() {
			console.log('changed');
		},
		inputChanged(value) {
			this.activeNames = value;
		},
		getComponentData() {
			return {
				on: {
					change: this.handleChange,
					input: this.inputChanged
				},
					props: {
				value: this.activeNames
				}
			};
		}
	}
	
**Events**  
支持sortable的事件
start/add/remove/update/end/choose/sort/filter/clone  
在使用这些事件时需要在前面加上“on”，即：onStart/onAdd/...  
当list参数不是空时并且相应的数组被drag-and-drop操作过就会触发change事件。这个事件的argument包括：  

- added
	- newIndex
	- element
- removed
	- oldIndex
	- element
- moved
	- newIndex
	- oldIndex
	- element  
- added: contains information of an element added to the array
    - newIndex: the index of the added element
    - element: the added element
- removed: contains information of an element removed from to the array
    - oldIndex: the index of the element before - - remove
    - element: the removed element
- moved: contains information of an element moved within the array
    - newIndex: the current index of the moved - - - element
    - oldIndex: the old index of the moved element
    - element: the moved element

**Slots**  

***
1/10/2018 12:50:54 PM by stone