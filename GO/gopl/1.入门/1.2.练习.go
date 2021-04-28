package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	var s, sep string
	for i := 0; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		sep = " "
	}
	fmt.Println(s)

	sep = ""
	s = ""
	for _, param := range os.Args {
		s += sep + param
		sep = " "
	}
	fmt.Println(s)

	fmt.Print(strings.Join(os.Args, " "))

}
