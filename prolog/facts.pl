
:- use_module(library(clpq)).

point(X,Y).

circle(X, Y, R) :-
    {X ** 2 + Y ** 2 #= R ** 2}.

% n_factorial(0, 1).
% n_factorial(N, F) :-
%         N #> 0, N1 #= N - 1, F #= N * F1,
%         n_factorial(N1, F1).