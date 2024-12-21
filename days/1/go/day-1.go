package main

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

func main() {
	absPath, _ := filepath.Abs("days/1/input-1.txt")

	inputData, err := os.ReadFile(absPath)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(inputData), "\n")

	leftArray := []int{}
	rightArray := []int{}

	for _, line := range lines {
		parts := strings.Split(line, "   ")
		if len(parts) != 2 {
			continue
		}
		left, _ := strconv.Atoi(parts[0])
		leftArray = append(leftArray, left)
		right, _ := strconv.Atoi(parts[1])
		rightArray = append(rightArray, right)
	}

	sort.Ints(leftArray)
	sort.Ints(rightArray)

	var distance int = 0

	for i := 0; i < len(leftArray); i++ {
		diff := leftArray[i] - rightArray[i]
		if diff < 0 {
			distance += -diff
		} else {
			distance += diff
		}
	}

	fmt.Printf("Similarity score is %d \n", distance)
}
