<h1>Taiga</h1>
<img src="./images/taiga.jpg">
<h3>What is Taiga?</h3>
Taiga is an extremely minimalist "programming language." In theory, you could call it a programming language, but a better term to describe it would be a syntax-superset of Javascript, and if you are unfamiliar with what that means, it essentially means that it runs exactly like Javascript, but with different syntax. That also means that any Javascript code you run through Taiga will run as Javascript.
<h3>The Programming Language in Slightly Above 200 Lines of Code</h3>
The actual compiler part of Taiga is slightly above 200 lines of code (210 lines as of version 1.0.0), which is incredible considering it has an entirely different syntax compared to Javascript. Taiga only consists of a tokenizer, and that is just about it, as simple as can be. Taiga is small, fast, and efficient.
<h3>Installation</h3>
First, make sure that you have <b>Node.js</b> installed on your system. If you do, you can install the Taiga CLI by executing the following command in your shell 
<pre>
$ npm install taiga-lang --global
</pre>
<h3>Usage</h3>
Create a directory for your Taiga project and navigate to it
<pre>
$ mkdir taiga-example
$ cd taiga-example
</pre>
Initialize your Taiga project
<pre>
$ taiga init
</pre>
Create your main file (by default, the main file will be <b>main.tai</b>, but if you want to change it, you can edit the <b>main</b> option in the <b>taiga.json</b> file). If you can't create it, just do it through the command line
<pre>
$ touch main.tai
</pre>
Now, you are set up for your Taiga project!
<h3>Tutorial</h3>
<h6>Variables/Constants</h6>
In Taiga, just like in regular Javascript, you have variables and constants. They are used to assign values to names for simplicity. To declare constants, use the @ symbol, or use the <b>constant keyword
<pre>
@example = "Hello World"
constant example = "Hello World"
</pre>
To declare variables/let, use the ~ operator, or use the variable keyword
<pre>
~example = "Hello World"
variable example = "Hello World"
</pre>
To explicitly define a variable as global (can be accessed anywhere in the code), use the gb or the global keyword
<pre>
gb example = "Hello World"
global example = "Hello World"
</pre>
<h6>Comments</h6>
Comments are ignored by the interpreter and are used to organize your code. Single line comments are comments that span only one line. To declare a single line comment in Taiga, use the # symbol. 
<pre>
#this is a comment
</pre>
Multiple line comments are comments that span multiple lines. To declare multiple line comments, start it with the -> symbol and end it with the <- symbol
<pre>
->
this
is
a
multiple
line
comment
<-
</pre>
<h6>Printing to the Console</h6>
In Taiga, you can print a string, number, or whatever by using the pr keyword
<pre>
pr "Hello World"
#output is: Hello World

#you can even print two different things on the same line using a semicolon
pr "Hello World"; pr "Hello Earth"
->
output is:
Hello World
Hello Earth
<-
</pre>
If you need to (for whatever reason) use a function for this purpose, there is a print function in Taiga
<pre>
print("Hello World")
</pre>
<h6>Printing Errors to the Console</h6>
To print errors to the console, use the er keyword
<pre>
er "Error"
#output is: Error
</pre>
<h6>Types</h6>
Javascript and Taiga contain the same types, booleans, strings, numbers, objects, undefined, and null. You can find the type of a variable or whatever by using the <b>type</b> keyword
<pre>
@string = "Hello World"
@number = 1
@boolean = true
pr type string; pr type number; pr type boolean
->
output is: 
string
number
boolean
<-
</pre>
<h6>Functions</h6>
Functions are lines of code that can be executed as a whole. In Taiga, you can declare functions using the def or func keyword (I personally prefer using func). If you are creating a function with no arguements, then there is a function shorthand where you don't need to use parentheses, but it is required to use parentheses when calling the function.
<pre>
func helloWorld
    pr "Hello World"
end
helloWorld()

#alternatively this

def helloWorld
    pr "Hello World"
end
helloWorld()

#output is: Hello World
</pre>
If you are using arguements, you can just follow the regular Javascript function arguement syntax like this
<pre>
func add(num1, num2)
    pr num1 + num2
end
add(2, 2)
#output is: 4
</pre>
<h6>Return</h6>
To return something, you can use the $r keyword or the ret keyword as shown below
<pre>
func helloWorld
    $r "Hello World"
end
pr helloWorld()

#alternatively this

func helloWorld
    ret "Hello World"
end
pr helloWorld()

#output is: Hello World
</pre>
<h6>Conditional Statements (if...else)</h6>
Conditional statements in Taiga follow relatively the same syntax as conditional statements in Javascript. Here is an example
<pre>
@num = 1
if num === 0
    pr "The number is 0"
elif num === 1
    pr "The number is 1"
else
    pr "The number is not 0 or 1"
end

#output is: The number is 1
</pre>
<h6>Check Status (switch/case)</h6>
Check Status statements are a shorthand for if...else statements, in which only one value is constantly being evaluated against other values. This simplifies the repetitiveness of if...else statements sometimes. Here is an example of how you would use it
<pre>
@num = 4
check num
status 0
    pr "The number is 0"
status 1
    pr "The number is 1"
status 2
    pr "The number is 2"
status 3
    pr "The number is 3"
status 4
    pr "The number is 4"
status 5
    pr "The number is 5"
default
    pr "The number is not 0, 1, 2, 3, 4, or 5"
end

#output is: The number is 4
</pre>
<h6>FOR Loop</h6>
A for loop repeats an action a certain amount of times. In Taiga, with a for loop, you would use the lf (loop for) keyword and you would have three options, the loop variable, the starting interval, and the end interval. Here is an example of counting 0-9 with a for loop with Taiga.
<pre>
lf x 0 10
    pr x
end

->
output is: 
0
1
2
3
4
5
6
7
8
9
<-
</pre>
In this example, we create an interval that starts at 0, and them keeps looping until the number becomes equal to (or greater than) the final interval. Inside the loop, we print x every time we go through the loop, and the value of x increments by one each time we go through the loop.
<h6>WHILE Loop</h6>
A while loop loops a certain piece of code until a condition becomes true. For example, we can create a variable, x, and then run it through a while loop, incrementing it until x becomes greater than 9 (not less than 10). Here is that example.
</pre>
~x = 0
lw x&lt;10
    pr x
    x++
end
</pre>
<h6>Boolean Operator</h6>
In Taiga, there are 3 main boolean operators (not talking about true/false). There is OR, AND, and NOT.
In Javascript, the OR operator is ||, the AND operator is &&, and the NOT operator is !. Here is an example with the AND operator (and)
<pre>
~x = 1
~y = 1
if x == 1 && y == 1
    pr "X and Y are equal and equal to 1"
elif x == y
    pr "X and Y are equal but not equal to 1"
else 
    pr "X and Y are not equal and both not equal to 1"
end

#output is: X and Y are equal and equal to 1
</pre>
Here is an example with the OR operator (or)
<pre>
~x = 1
~y = 2
if x == 2 || y == 2
    pr "X, Y, or both X and Y are equal to 2"
else
    pr "Neither X or Y is equal to 2"
end

#output: X, Y, or both X and Y are equal to 2
</pre>
Here is an example with the NOT operator (not)
<pre>
~x = 1
if x not == 1
    pr "X is not 1"
else 
    pr "X is 1"
end
</pre>
<h6>Try/Catch/Finally Statement</h6>
Try...Catch...Finally statements are used for error catching and debugging. The way it works is first, it attempts to run a piece of code. If the code fails to run (error), it will catch the error and you can handle the error (like print it). Then, there is an option for finally, so if the code successfully executes, it finally executes some other code. Here is an example
<pre>
try
    pr "Hello World"
catch error
    er error
finally
    pr "No Error!"
end

->
output is: 
Hello World
No Error!
<-
</pre>
<h3><b>END OF TUTORIAL</b></h3>
If you have any questions about Taiga, please do not hesitate to talk to me, you can email me (therealenny1@gmail.com) or hit me up on discord (Stevano#1771). I would be more than glad to try to answer questions and listen to suggestions
<h3>Planned Updates</h3>
1. Offer a compile option to compile a Taiga file to pure Javascript
<br>
2. Add a package ecosystem for Taiga
<br>
3. Add support for more tools (eg. )
<i>v1.0.0</i>