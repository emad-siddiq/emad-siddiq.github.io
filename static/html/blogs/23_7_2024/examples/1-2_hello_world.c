#include <stdio.h>

void backslash() {
    printf("\\1:, \1 <-- empty since this represents an octal which is a non-printable  control character\n");
    printf("\\a:, \a <-- Produces beep if run in terminal on Mac, doesn't work inside VSCode terminal \n");
    printf("\\b:, erase\b <-- Erases character preceding it\n");
    printf("\\c:, \c <-- gcc: warning: unknown escape sequence\n");
    printf("\\d:, \d <-- gcc: warning: unknown escape sequence\n");
    printf("\\t:, Adds a \t tab.\n");
    printf("\\g \g, <-- gcc: warning: unknown escape sequence");
}

int main() {
    printf("Hello");
    printf(" World!");
    printf("\n");
  //putchar('\a');

    backslash();
} 


