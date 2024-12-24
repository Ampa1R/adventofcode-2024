package main

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

func partOne() int {
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

	return distance
}

func partTwo() int {

	absPath, _ := filepath.Abs("days/1/input-1.txt")

	inputData, err := os.ReadFile(absPath)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(inputData), "\n")

	leftArray := []int{}

	itemsMap := make(map[int]int)

	for i := 0; i < len(lines); i++ {
		parts := strings.Split(lines[i], "   ")
		if len(parts) != 2 {
			continue
		}

		left, _ := strconv.Atoi(parts[0])
		right, _ := strconv.Atoi(parts[1])

		leftArray = append(leftArray, left)
		itemsMap[right] += 1
	}

	var distance int = 0

	for i := 0; i < len(leftArray); i++ {
		distance += leftArray[i] * itemsMap[leftArray[i]]
	}

	return distance
}

func main() {

	partOneDistance := partOne()
	fmt.Printf("[Part 1] Similarity score is %d \n", partOneDistance)

	partTwoDistance := partTwo()
	fmt.Printf("[Part 2] Similarity score is %d \n", partTwoDistance)
}
