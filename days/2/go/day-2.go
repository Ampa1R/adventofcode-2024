package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"strconv"
)

func partOne() int {
	absPath, _ := filepath.Abs("days/2/input-2.txt")

	inputData, err := os.ReadFile(absPath)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(inputData), "\n")

	var safeReports int = 0

	for _, line := range lines {
		parts := strings.Split(line, " ")

		trend := 0
		for i := 1; i < len(parts); i++ {
			prevNum, _ := strconv.Atoi(parts[i-1])
			num, _ := strconv.Atoi(parts[i])
			
			diff := prevNum - num

			currentTrend := 1
			if diff < 0 {
				currentTrend = -1
			}

			if trend == 0 {
				trend = currentTrend
			} else if trend != currentTrend {
				safeReports -= 1
				break
			}

			if absDiff := diff * currentTrend; absDiff < 1 || absDiff > 3 {
				safeReports -= 1
				break
			}
		}
		safeReports += 1
	}

	return safeReports
}

func main() {
	safeReports := partOne()

	fmt.Printf("[Part 1] Safe reports num - %d \n", safeReports)
}