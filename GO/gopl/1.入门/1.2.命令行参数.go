package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	var s, sep string

	for i := 1; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		sep = " "
	}

	fmt.Println(s)

	sep = ""
	s = ""
	// 另外一种循环
	for _, temp := range os.Args[1:] {
		s += sep + temp
		sep = " "
	}
	fmt.Println(s)

	// 如果这边字符串拼接比较多则代价比较高昂 利用strings来拼接字符串
	var str string
	str = strings.Join(os.Args[1:], " ")
	fmt.Print(str)
}
