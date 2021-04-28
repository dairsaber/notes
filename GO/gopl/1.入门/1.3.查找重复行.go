package main

import (
	"bufio"
	"os"
)

func main() {
	// 1. 新建一个map
	count := make(map[string]int)
	// 2. 新建一个输入流
	input := bufio.NewScanner(os.Stdin)

	for input.Scan() {
		count[input.Text()]++
	}

}
