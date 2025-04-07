package main

import "fmt"

type Person struct {
	name string
	age  int
}
type Speaker interface {
	Speak() string
}

func (p Person) Speak() string {
	return fmt.Sprintf("My name is %s and I am %d years old", p.name, p.age)
}

func main() {
	fmt.Println("hello world")

	var x int = 10

	y := 20

	const z int = 5

	fmt.Println(x, y, z)

	p := Person{name: "adom", age: 30}
	fmt.Println(p.Speak())

	var ptr *int
	r:=10
	ptr = &r
	fmt.Println(*ptr)
	fmt.Println(ptr)

	
}