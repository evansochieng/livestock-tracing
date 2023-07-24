FROM python:3.8
# Install pipenv
RUN pip install pipenv gunicorn
WORKDIR /app

COPY ./backend ./
# Install python dependencies in /.venv
COPY ./Pipfile .
COPY ./Pipfile.lock .

# Install project dependencies using pipenv
RUN pipenv install --system --deploy
ENV FLASK_ENV production

EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "app:app"]
