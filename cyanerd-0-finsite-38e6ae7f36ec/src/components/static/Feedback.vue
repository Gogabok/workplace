<template>
    <div class="form" style="max-width: 50%;">
        <form method="get">
            <fieldset>
                <div class="form-field">
                    <input type="text" name="name" autocomplete="off" placeholder="Имя" class="full-width"/>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-field">
                    <input type="text" name="email" autocomplete="off" placeholder="E-mail" class="full-width"/>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-field">
                    <textarea name="message" placeholder="Сообщение" class="full-width"
                              style="resize: none;"></textarea>
                </div>
            </fieldset>
            <button type="submit" class="submit btn btn--primary full-width">Отправить</button>

            <div class="contacts-description">
                Владелец: ИП Егоров Александр Андреевич<br>
                ИНН: 773323956498<br>
                ОГРНИП: 319774600117874<br>
                E-mail: <a href="mailto:hello@finsite.me">hello@finsite.me</a>
            </div>
        </form>
    </div>
</template>