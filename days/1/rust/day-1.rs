use std::fs;
use std::io;

fn main() -> io::Result<()> {
    let input_data = fs::read_to_string("days/1/input-1.txt")?;

    let mut left_array: Vec<i32> = vec![];
    let mut right_array: Vec<i32> = vec![];

    for line in input_data.lines() {
        let parts: Vec<&str> = line.split("   ").collect();
        let left = parts[0];
        left_array.push(left.parse::<i32>().unwrap());
        let right = parts[1];
        right_array.push(right.parse::<i32>().unwrap());
    }

    left_array.sort();
    right_array.sort();

    let mut distance = 0;

    for i in 0..left_array.len() {
        let left = left_array[i];
        let right = right_array[i];
        let diff = left - right;
        distance += diff.abs();
    }

    println!("Similarity score is {:?}", distance);
    Ok(())
}
