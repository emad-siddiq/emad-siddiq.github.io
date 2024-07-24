#include <stdio.h> 
/* print Celsius-Fahrenheit table 
    for f = 0, 20, ..., 300 */
    
int main() {
    int lower, upper, step;
    float fahr, celsius;

    lower = 0; /* lower limit of temperature table */
    upper = 300; /* upper limit */
    step = 20; /* step size */

    celsius = lower;
    printf("%6s %6s\n", "Celsius", "Fahrenheit");

    while (celsius <= upper) {
        fahr = (celsius * (9.0/5.0)) + 32.0;
        printf("%6.0f %6.1f\n", celsius, fahr);
        celsius = celsius + step;
    }

    
}