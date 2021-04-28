package main

import "fmt"

func changeValue(a int) {
	a += 10
}
func changeValue2(a *int) {
	*a = *a + 10
}
func main() {
	a := 10
	changeValue(a)
	fmt.Println(a) // 10
	changeValue2(&a)
	fmt.Println(a) // 20

}
