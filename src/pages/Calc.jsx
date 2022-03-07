import React, { useState, useRef } from 'react'
import { Input, Button, message } from 'antd';
import './Calc.css'

function Calc() {
  const [inputStr, setInputStr] = useState('')
  const inputArea = useRef()
  const handleCalc = (type) => {
    let inputValue = inputArea?.current?.resizableTextArea?.props?.value || ''
    if (!inputValue) {
      message.error('请输入一个数组')
    }
    inputValue = JSON.parse(inputValue)
    console.log('inputValue: ', inputValue);
    switch (type) {
      case 1:
        bubbleSort(inputValue)
        break;
      case 2:
        chosenSort(inputValue)
        break;
      case 3:
        insertSort(inputValue)
        break;
      case 4:
        mergeSort(inputValue)
        break;
      case 5:
        quickSort(inputValue)
        break;
      default:
        break;
    }
  }
  const bubbleSort = (arr) => {
    console.time('冒泡算法耗时')
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = tmp
        }
      }
    }
    console.timeEnd('冒泡算法耗时')
    console.log('arr: ', arr);
    setInputStr(`${JSON.stringify(arr)}`)
  }
  const chosenSort = (arr) => {
    console.time('选择算法耗时')
    let minIndex,temp;
    for (let i = 0; i < arr.length - 1; i++) {
      minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {     //寻找最小的数
          minIndex = j;                 //将最小数的索引保存
        }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }   
    console.timeEnd('选择算法耗时')
    console.log('arr: ', arr);
    setInputStr(`${JSON.stringify(arr)}`)
  }
  const insertSort = (arr) => {
    console.time('插入算法耗时')
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    console.timeEnd('插入算法耗时')
    console.log('arr: ', arr);
    setInputStr(`${JSON.stringify(arr)}`)
  }
  const mergeSort = (array) => {
    console.time('归并算法耗时');
    function merge(left, right) {
      let result = [];
      while (left.length && right.length) {
        if (left[0] <= right[0]) {
          result.push(left.shift());
        } else {
          result.push(right.shift());
        }
      }

      while (left.length)
        result.push(left.shift());

      while (right.length)
        result.push(right.shift());
      return result;
    }
    function mSort(arr) {
      let len = arr.length;
      if(len < 2) {
          return arr;
      }
      let middle = Math.floor(len / 2),
          left = arr.slice(0, middle),
          right = arr.slice(middle);
      return merge(mSort(left), mSort(right));
    }
    let res = mSort(array)
    console.timeEnd('归并算法耗时');
    console.log('res: ', res);
    setInputStr(`${JSON.stringify(res)}`)
  }
  const quickSort = (array) => {
    console.time('快速排序算法耗时')
    function qSort(arr) {
      if (arr.length <= 1) {
        return arr
      }
      let pivotIndex = Math.floor(arr.length / 2),
        pivot = arr.splice(pivotIndex, 1)[0],
        left = [],
        right = [];
      for (let i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
          left.push(arr[i])
        } else {
          right.push(arr[i])
        }
      }
      return qSort(left).concat([pivot], qSort(right))
    }
    let result = qSort(array)
    console.timeEnd('快速排序算法耗时');
    console.log('result: ', result);
    setInputStr(`${JSON.stringify(result)}`)
  }
  function randomNum() {
    let defaultValue = []
    while (defaultValue.length < 50) {
      let num = Math.floor(Math.random() * 50 + 1)
      if (defaultValue.indexOf(num) === -1) {
        defaultValue.push(num)
      }
    }
    return JSON.stringify(defaultValue)
  }
  return (
    <div className="calc-content">
      <Input.TextArea ref={inputArea} defaultValue={randomNum()} className="calc-area" style={{ height: '100%' }} />
      <div className="calc-btn-group">
        <Button type="primary" className="calc-btn" onClick={() => handleCalc(1)}>冒泡算法</Button>
        <Button type="primary" className="calc-btn" onClick={() => handleCalc(2)}>选择算法</Button>
        <Button type="primary" className="calc-btn" onClick={() => handleCalc(3)}>插入算法</Button>
        <Button type="primary" className="calc-btn" onClick={() => handleCalc(4)}>归并算法</Button>
        <Button type="primary" className="calc-btn" onClick={() => handleCalc(5)}>快速算法</Button>
      </div>
      <Input.TextArea value={inputStr} className="calc-area" style={{ height: '100%' }} />
    </div>
  )
}
export default Calc;